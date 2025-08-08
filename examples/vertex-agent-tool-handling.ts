import { FieldServiceSdk } from '../src/sdk';
import { 
  processAgentToolCodeResponse, 
  processToolCalls,
  formatToolResultMessage 
} from '../src/utils/toolFunctionHandlers';
import { parseToolCallsFromResponse } from '../src/utils/toolCallParser';

/**
 * Example of handling tool functions from Vertex AI agent responses
 */
async function handleVertexAgentResponse() {
  const sdk = new FieldServiceSdk({
    apiKey: process.env.FIELDSERVICE_API_KEY!,
    env: 'production'
  });

  // Example 1: Handle tool_code format responses
  console.log('=== Example 1: Handling tool_code format ===');
  
  // Simulate an agent response with tool_code
  const agentResponse1 = `
    I'll help you create a new client. Let me do that for you.
    
    \`\`\`tool_code
    {
      "action": "createClient",
      "parameters": {
        "name": "Asaf Klibansky",
        "phone": "555-0123",
        "email": "asaf@example.com"
      }
    }
    \`\`\`
  `;

  const toolResult1 = await processAgentToolCodeResponse(sdk, agentResponse1);
  
  if (toolResult1) {
    console.log('Tool execution result:', toolResult1);
    
    // You can update the conversation with the result
    const updatedResponse = toolResult1.success 
      ? `I've created a new client record for ${toolResult1.data?.name}. Client ID: ${toolResult1.data?.id}`
      : `I couldn't create the client: ${toolResult1.error}`;
    
    console.log('Updated response:', updatedResponse);
  }

  // Example 2: Handle standard Vertex AI tool calls
  console.log('\n=== Example 2: Handling standard Vertex AI tool calls ===');
  
  const vertexResponse = await sdk.vertexChatCompletion({
    messages: [
      { 
        role: 'user', 
        content: 'Create a new client named David Ray and update their phone to 777-888-3333' 
      }
    ],
    functions: [
      {
        name: 'createClient',
        description: 'Creates a new client in the database',
        parameters: {
          type: 'object',
          properties: JSON.stringify({
            name: { type: 'string', description: 'Client name' },
            phone: { type: 'string', description: 'Phone number' },
            email: { type: 'string', description: 'Email address' }
          }),
          required: ['name']
        }
      },
      {
        name: 'updateClient',
        description: 'Updates an existing client',
        parameters: {
          type: 'object',
          properties: JSON.stringify({
            clientId: { type: 'string', description: 'Client ID' },
            phone: { type: 'string', description: 'New phone number' },
            email: { type: 'string', description: 'New email address' }
          }),
          required: ['clientId']
        }
      }
    ]
  });

  // Parse and process tool calls from the response
  const parsedToolCalls = parseToolCallsFromResponse(vertexResponse);
  
  if (parsedToolCalls && parsedToolCalls.length > 0) {
    console.log('Found tool calls:', parsedToolCalls);
    
    // Process all tool calls
    const results = await processToolCalls(sdk, parsedToolCalls);
    
    // Format results for display
    const resultMessage = formatToolResultMessage(results);
    console.log('Tool execution results:', resultMessage);
    
    // Continue the conversation with the results
    const followUpResponse = await sdk.vertexChatCompletion({
      messages: [
        { 
          role: 'user', 
          content: 'Create a new client named David Ray and update their phone to 777-888-3333' 
        },
        {
          role: 'assistant',
          content: vertexResponse.data?.vertexChatCompletion?.content || '',
          toolCalls: vertexResponse.data?.vertexChatCompletion?.toolCalls
        },
        {
          role: 'tool',
          content: resultMessage
        }
      ]
    });
    
    console.log('Final response:', followUpResponse.data?.vertexChatCompletion?.content);
  }

  // Example 3: Using the enhanced method with automatic parsing
  console.log('\n=== Example 3: Using enhanced method with automatic parsing ===');
  
  const enhancedResponse = await sdk.vertexChatCompletionWithParsedTools({
    messages: [
      { 
        role: 'user', 
        content: 'Create a job for client CL123 titled "AC Repair" scheduled for tomorrow' 
      }
    ],
    functions: [
      {
        name: 'createJob',
        description: 'Creates a new job',
        parameters: {
          type: 'object',
          properties: JSON.stringify({
            clientId: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            scheduledDate: { type: 'string' }
          }),
          required: ['clientId', 'title']
        }
      }
    ]
  });

  if (enhancedResponse.parsedToolCalls) {
    const results = await processToolCalls(sdk, enhancedResponse.parsedToolCalls);
    console.log('Job creation results:', formatToolResultMessage(results));
  }
}

/**
 * Example of a complete conversation flow with tool handling
 */
async function completeConversationFlow() {
  const sdk = new FieldServiceSdk({
    apiKey: process.env.FIELDSERVICE_API_KEY!,
    env: 'production'
  });

  console.log('\n=== Complete Conversation Flow ===');

  // Define available functions
  const availableFunctions = [
    {
      name: 'createClient',
      description: 'Creates a new client',
      parameters: {
        type: 'object',
        properties: JSON.stringify({
          name: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string' }
        }),
        required: ['name']
      }
    },
    {
      name: 'updateClient',
      description: 'Updates a client',
      parameters: {
        type: 'object',
        properties: JSON.stringify({
          clientId: { type: 'string' },
          name: { type: 'string' },
          phone: { type: 'string' },
          email: { type: 'string' }
        }),
        required: ['clientId']
      }
    }
  ];

  const messages: any[] = [
    {
      role: 'user',
      content: 'I need to create a new client "John Doe" with phone 555-1234 and then update his email to john@example.com'
    }
  ];

  let continueConversation = true;
  
  while (continueConversation) {
    // Get response from Vertex AI
    const response = await sdk.vertexChatCompletion({
      messages,
      functions: availableFunctions
    });

    const assistantMessage = response.data?.vertexChatCompletion;
    
    if (!assistantMessage) break;

    // Add assistant message to history
    messages.push({
      role: 'assistant',
      content: assistantMessage.content,
      toolCalls: assistantMessage.toolCalls
    });

    // Check for tool calls
    const parsedToolCalls = parseToolCallsFromResponse(response);
    
    if (parsedToolCalls && parsedToolCalls.length > 0) {
      console.log('Processing tool calls...');
      
      // Execute tool calls
      const results = await processToolCalls(sdk, parsedToolCalls);
      const toolResults = formatToolResultMessage(results);
      
      // Add tool results to conversation
      messages.push({
        role: 'tool',
        content: toolResults
      });
      
      console.log('Tool results:', toolResults);
    } else {
      // No more tool calls, conversation complete
      console.log('Final response:', assistantMessage.content);
      continueConversation = false;
    }
  }
}

// Run examples
if (require.main === module) {
  handleVertexAgentResponse()
    .then(() => completeConversationFlow())
    .catch(console.error);
}