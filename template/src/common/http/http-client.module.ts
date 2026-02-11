// src/common/http-client.module.ts
import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpClientService } from './http-client.service';
import * as http from 'http';
import * as https from 'https';

@Module({
  imports: [
    HttpModule.register({
        timeout: 300000,
        maxRedirects: 5,
        baseURL: 'https://example.com/v2/', // please change a base url 
        httpAgent: new http.Agent({ keepAlive: true }),
        httpsAgent: new https.Agent({ keepAlive: true }),
      // baseURL peut être défini ici ou passé à chaque appel
    }),
  ],
  providers: [HttpClientService],
  exports: [HttpClientService],
})
export class HttpClientModule {}
 