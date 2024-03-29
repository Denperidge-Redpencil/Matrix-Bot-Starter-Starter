// index.ts
import { MatrixClient } from 'matrix-bot-sdk';
import { newClient, awaitMoreInput, onMessage, changeAvatar, changeDisplayname } from 'matrix-bot-starter';

async function onEvents(client : MatrixClient) {
    onMessage(client, 
        async (roomId : string, event : any, sender: string, content: any, body: any, requestEventId: string, isEdit: boolean, isHtml: boolean, mentioned: string) => {
        if (isHtml) {
            if (mentioned) {
                let command = mentioned.toLowerCase();

                if (command.includes('picture') || command.includes('avatar')) {
                    awaitMoreInput(client, roomId, event,
                        true, 
                        {
                            description: 'avatar change',
                            messageType: 'm.image',
                            functionToExecute: changeAvatar
                        }, 
                        'Setting new avatar! If your next message is an image, I will update my avatar to that.');    
                }

                if (command.includes('name') || command.includes('handle')) {
                    awaitMoreInput(client, roomId, event,
                        true, 
                        {
                            description: 'display name change',
                            messageType: 'm.text',
                            functionToExecute: changeDisplayname
                        }, 
                        'Setting new display name! I\'ll set it to the contents of your next message.');
                }
            }
        }
    });

}

newClient().then((client : MatrixClient) => {
    onEvents(client);
});