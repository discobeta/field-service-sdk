import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldServiceSDK } from '../src';
import { NavigationAction } from '../src/types/enhanced-responses';

/**
 * React Component Example: AI Chat with Automatic Navigation
 * 
 * This example shows how to integrate the AI agent with React Router
 * to automatically navigate users after records are created/updated.
 */

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const AIAgentChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Initialize SDK (in a real app, this would come from context or props)
  const sdk = new FieldServiceSDK({
    authToken: 'your-auth-token',
    graphqlEndpoint: process.env.REACT_APP_GRAPHQL_ENDPOINT!
  });

  /**
   * Handle navigation actions from the AI response
   */
  const handleNavigationAction = (action: NavigationAction) => {
    const { screenType, recordId, isNewRecord } = action;
    
    // Show a toast or notification about the navigation
    const message = isNewRecord 
      ? `Created new ${screenType}. Navigating...`
      : `Updated ${screenType}. Navigating...`;
    
    // You could show a toast here
    console.log(message);
    
    // Navigate based on screen type
    switch (screenType) {
      case 'client':
        navigate(`/clients/${recordId}`);
        break;
      case 'job':
        navigate(`/jobs/${recordId}`);
        break;
      case 'invoice':
        navigate(`/invoices/${recordId}`);
        break;
      case 'estimate':
        navigate(`/estimates/${recordId}`);
        break;
    }
  };

  /**
   * Send message to AI agent
   */
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get current context from URL
      const currentPath = window.location.pathname;
      let currentScreenType: string | undefined;
      let currentRecordId: string | undefined;

      // Parse current route to get context
      const pathMatch = currentPath.match(/\/(clients|jobs|invoices|estimates)\/([a-zA-Z0-9-]+)/);
      if (pathMatch) {
        currentScreenType = pathMatch[1].slice(0, -1); // Remove 's' from plural
        currentRecordId = pathMatch[2];
      }

      // Send request with context
      const response = await sdk.vertexChatCompletionWithParsedTools({
        messages: messages.concat(userMessage).map(m => ({
          role: m.role,
          content: m.content
        })),
        currentScreenType,
        currentRecordId
      });

      if (response.data?.vertexChatCompletion?.result?.success) {
        const result = response.data.vertexChatCompletion.result;

        // Add AI response to messages
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: result.content || 'Action completed successfully.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);

        // Handle navigation if present
        if (response.navigationActions && response.navigationActions.length > 0) {
          // If multiple actions, navigate to the last one (most recent)
          const primaryAction = response.navigationActions[response.navigationActions.length - 1];
          
          // Delay navigation slightly so user can see the response
          setTimeout(() => {
            handleNavigationAction(primaryAction);
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ai-chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="typing-indicator">AI is thinking...</div>
          </div>
        )}
      </div>
      
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask me to create clients, jobs, invoices..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

/**
 * Hook for handling navigation actions in any component
 */
export const useAINavigation = () => {
  const navigate = useNavigate();

  const handleNavigationActions = (actions: NavigationAction[]) => {
    if (!actions || actions.length === 0) return;

    // Handle multiple actions
    if (actions.length > 1) {
      // You could show a modal to let user choose
      console.log('Multiple navigation options:', actions);
      
      // For now, navigate to the last action
      const lastAction = actions[actions.length - 1];
      navigateToAction(lastAction);
    } else {
      navigateToAction(actions[0]);
    }
  };

  const navigateToAction = (action: NavigationAction) => {
    const routes: Record<string, string> = {
      client: '/clients',
      job: '/jobs',
      invoice: '/invoices',
      estimate: '/estimates'
    };

    const basePath = routes[action.screenType];
    if (basePath) {
      navigate(`${basePath}/${action.recordId}`);
    }
  };

  return { handleNavigationActions };
};