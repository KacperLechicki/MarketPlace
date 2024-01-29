import { MessageContext } from '../interfaces/message-context/message-context.interface';

export function Messages(context: MessageContext, item: string) {
	switch (context) {
		case MessageContext.NOT_EXIST:
			return `${item} does not exist.`;
		default:
			return `${item} message.`;
	}
}
