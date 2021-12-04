import { BullWorker, BullWorkerProcess } from '@anchan828/nest-bullmq';
import { HttpService } from '@nestjs/axios';
import { Job } from 'bullmq';
import { ENV } from 'src/ENV';

@BullWorker({ queueName: ENV.NOTIFICATION_QUEUE })
export class SendNotificationWorker {
  constructor(private readonly http: HttpService) {}

  @BullWorkerProcess()
  public async process(job: Job): Promise<{ status: string }> {
    const { message, title, token } = job.data;

    await this.sendNotification(message, title, token);

    return { status: 'ok' };
  }

  async sendNotification(message: string, title: string, to: string) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `key=${ENV.FCM_SERVER_KEY}`,
    };
    const payload = {
      notification: {
        title,
        body: message,
        icon: 'assets/main-page-logo-small-hat.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        actions: [
          {
            action: 'explore',
            title: 'Go to the site',
          },
        ],
      },
      to,
    };
    try {
      this.http
        .post(ENV.FCM_API_ENDPOINT, payload, { headers })
        .subscribe((res) => {});
    } catch (error) {
      return error;
    }
  }
}
