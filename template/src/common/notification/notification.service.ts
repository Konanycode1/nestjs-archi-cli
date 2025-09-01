import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { env } from 'config/env.validation';
import { includes } from 'zod';

interface NotificationPayload {
  title: string;
  body: string;
  imageUrl?: string;
  userIdList?: number[] | string[];
}

@Injectable()
export class NotificationServiceSignale {
  private readonly logger = new Logger(NotificationServiceSignale.name);
  private readonly oneSignalAppId: string;
  private readonly oneSignalApiKey: string;
  private readonly channelId: string;
  private readonly oneSignalRestApiUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.oneSignalAppId = env.ONESIGNAL_APP_ID; // this.configService.get<string>('ONE_SIGNAL_APP_ID');
    this.oneSignalApiKey = env.ONESIGNAL_API_KEY;
    this.channelId = env.ONESIGNAL_CHANNEL_ID;
    this.oneSignalRestApiUrl = env.ONESIGNAL_REST_API_URL
  }

  async sendNotificationPush({
    title,
    body,
    imageUrl,
    userIdList = [],
  }: NotificationPayload): Promise<AxiosResponse<any>> {
    const stringifiedUserIdList = userIdList.map((id) => id.toString());

    const notificationData = {
      app_id: this.oneSignalAppId,
      contents: { en: body },
      headings: { en: title },
      target_channel: 'push',
      small_icon: 'ic_stat_onesignal_default',
      existing_android_channel_id: this.channelId,
      big_picture: imageUrl || undefined,
      priority: 10,
      ...(stringifiedUserIdList.length >0 && {include_aliases: {
        external_id: stringifiedUserIdList,
      }})
      ,
      ...(stringifiedUserIdList.length === 0 && {included_segments:['All'] })
    };

    try {
      const response = await axios.post(
        this.oneSignalRestApiUrl,
        notificationData,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Basic ${this.oneSignalApiKey}`,
          },
        },
      );
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error('Erreur Axios:', error.response?.data);
      } else {
        this.logger.error('Erreur inconnue:', error);
      }
      throw error;
    }
  }
}
