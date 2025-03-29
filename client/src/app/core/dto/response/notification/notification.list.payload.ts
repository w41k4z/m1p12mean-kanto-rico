import { Notification } from '../../notification';

export class NotificationListPayload {
    constructor(public notifications: Notification[]) {}
}
