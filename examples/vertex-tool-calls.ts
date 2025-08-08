import { FieldServiceSDK, parseToolCallArguments, extractToolCalls } from '../src';

// Example: Using Vertex AI with function calling
async function exampleVertexWithTools() {
  // Initialize the SDK
  const sdk = new FieldServiceSDK({
    apiUrl: 'https://api.example.com/graphql',
    token: 'your-auth-token'
  });

  // Define functions that the AI can call
  const functions = [
    {
      name: 'get_weather',
      description: 'Get the current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'The city and state, e.g., San Francisco, CA'
          },
          unit: {
            type: 'string',
            enum: ['celsius', 'fahrenheit'],
            description: 'The temperature unit'
          }
        },
        required: ['location']
      }
    },
    {
      name: 'search_jobs',
      description: 'Search for jobs in the field service system',
      parameters: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['pending', 'in_progress', 'completed'],
            description: 'Job status filter'
          },
          clientId: {
            type: 'string',
            description: 'Filter by client ID'
          }
        },
        required: []
      }
    }
  ];

  try {
    // Method 1: Using the standard vertexChatCompletion
    const response = await sdk.vertexChatCompletion({
      messages: [
        {
          role: 'user',
          content: 'What\'s the weather in San Francisco and are there any pending jobs?'
        }
      ],
      functions: functions,
      functionCall: 'auto', // Let the model decide when to call functions
      model: 'google/gemini-2.0-flash-001',
      temperature: 0.7
    });

    // Check if the response contains tool calls
    if (sdk.responseHasToolCalls(response)) {
      // Parse the tool calls
      const parsedToolCalls = sdk.parseToolCallsFromResponse(response);
      
      console.log('Tool calls detected:');
      parsedToolCalls.forEach(toolCall => {
        console.log(`- Function: ${toolCall.function.name}`);
        console.log(`  Arguments:`, toolCall.function.arguments);
        
        // Handle each function call
        if (toolCall.function.name === 'get_weather' && toolCall.function.arguments) {
          // Make actual weather API call here
          console.log(`  Getting weather for ${toolCall.function.arguments.location}`);
        } else if (toolCall.function.name === 'search_jobs' && toolCall.function.arguments) {
          // Search for jobs using the SDK
          console.log(`  Searching for ${toolCall.function.arguments.status || 'all'} jobs`);
        }
      });
    }

    // Method 2: Using the enhanced method with parsed tools
    const enhancedResponse = await sdk.vertexChatCompletionWithParsedTools({
      messages: [
        {
          role: 'user',
          content: 'Find all completed jobs for client ABC123'
        }
      ],
      functions: functions,
      functionCall: 'auto'
    });

    // The enhanced response includes parsedToolCalls directly
    if (enhancedResponse.parsedToolCalls) {
      console.log('\nParsed tool calls from enhanced method:');
      enhancedResponse.parsedToolCalls.forEach(toolCall => {
        console.log(`- ${toolCall.function.name}:`, toolCall.function.arguments);
      });
    }

    // Method 3: Parsing tool calls manually from the raw response
    const rawResponse = response.data?.vertexChatCompletion?.result;
    if (rawResponse?.toolCalls && rawResponse.toolCalls.length > 0) {
      console.log('\nManually parsing tool calls:');
      
      rawResponse.toolCalls.forEach(toolCall => {
        // Parse individual tool call
        const args = parseToolCallArguments(toolCall);
        if (args) {
          console.log(`- ${toolCall.function?.name}:`, args);
        }
      });
    }

    // Example: Continuing the conversation with function results
    if (rawResponse?.toolCalls && rawResponse.toolCalls.length > 0) {
      // Prepare messages with function results
      const followUpMessages = [
        {
          role: 'user',
          content: 'What\'s the weather in San Francisco and are there any pending jobs?'
        },
        {
          role: 'assistant',
          content: rawResponse.content || ''
        }
      ];

      // Add function results
      rawResponse.toolCalls.forEach(toolCall => {
        if (toolCall.function?.name === 'get_weather') {
          followUpMessages.push({
            role: 'function',
            content: JSON.stringify({
              temperature: 72,
              unit: 'fahrenheit',
              conditions: 'Sunny',
              location: 'San Francisco, CA'
            })
          });
        } else if (toolCall.function?.name === 'search_jobs') {
          followUpMessages.push({
            role: 'function',
            content: JSON.stringify({
              jobs: [
                { id: 'job-123', status: 'pending', client: 'ABC Corp' },
                { id: 'job-456', status: 'pending', client: 'XYZ Inc' }
              ],
              total: 2
            })
          });
        }
      });

      // Continue the conversation with function results
      const finalResponse = await sdk.vertexChatCompletion({
        messages: followUpMessages,
        model: 'google/gemini-2.0-flash-001'
      });

      console.log('\nFinal response:', finalResponse.data?.vertexChatCompletion?.result?.content);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

// Example: Using standalone utility functions
function exampleStandaloneUtils() {
  // Mock tool calls response
  const mockToolCalls = [
    {
      id: 'call_123',
      type: 'function',
      function: {
        name: 'get_weather',
        arguments: '{"location": "New York, NY", "unit": "celsius"}'
      }
    }
  ];

  // Parse using standalone function
  const parsed = parseToolCallArguments(mockToolCalls[0]);
  console.log('Parsed arguments:', parsed);
  // Output: { location: 'New York, NY', unit: 'celsius' }

  // Extract from a mock response
  const mockResponse = {
    data: {
      vertexChatCompletion: {
        result: {
          success: true,
          content: 'I\'ll check the weather for you.',
          toolCalls: mockToolCalls
        }
      }
    }
  };

  const extractedCalls = extractToolCalls(mockResponse);
  console.log('Extracted tool calls:', extractedCalls);
}

// Run examples
exampleVertexWithTools();
exampleStandaloneUtils();