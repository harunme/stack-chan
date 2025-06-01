import { MCPServerService, type Tool } from 'mcp-server'

const EMOTIONS = ['NEUTRAL', 'HAPPY', 'SLEEPY', 'DOUBTFUL', 'SAD', 'ANGRY', 'COLD', 'HOT']

export function onRobotCreated(robot) {
  trace('Starting MCP Server mod\n')

  const mcpTools: Tool[] = [
    {
      name: 'set_emotion',
      description: 'Change robot facial expression/emotion',
      parameters: [
        {
          name: 'emotion',
          type: 'string',
          description: `Robot emotion. Available options: ${EMOTIONS.join(', ')}`,
          required: true,
        },
      ],
      handler: (args) => {
        const emotion = args.emotion as string

        if (!emotion || typeof emotion !== 'string') {
          return 'Error: Emotion is required and must be a string'
        }

        const upperEmotion = emotion.toUpperCase()
        if (!EMOTIONS.includes(upperEmotion)) {
          return `Error: Invalid emotion. Available options: ${EMOTIONS.join(', ')}`
        }

        try {
          robot.setEmotion(upperEmotion)
          return `Robot emotion changed to: ${upperEmotion}`
        } catch (error) {
          return `Error setting emotion: ${error}`
        }
      },
    },
    {
      name: 'say_message',
      description: 'Make robot speak a message',
      parameters: [
        {
          name: 'message',
          type: 'string',
          description: 'Text message for the robot to speak',
          required: true,
        },
      ],
      handler: async (args) => {
        const message = args.message as string

        if (!message || typeof message !== 'string') {
          return 'Error: Message is required and must be a string'
        }

        try {
          await robot.say(message)
          return `Robot said: "${message}"`
        } catch (error) {
          return `Error speaking message: ${error}`
        }
      },
    },
  ]

  const mcpServer = new MCPServerService({
    port: 8080,
    tools: mcpTools,
  })

  trace('MCP Server started on port 8080\n')
  trace('Available tools:\n')
  for (const tool of mcpTools) {
    trace(`  - ${tool.name}: ${tool.description}\n`)
  }
  trace('Connect with MCP client at http://[robot-ip]:8080/mcp\n')
}
