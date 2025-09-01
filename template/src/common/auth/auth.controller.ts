        import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Request, UseInterceptors, UseGuards } from '@nestjs/common';
        import { AuthService } from './auth.service';
        import { CreateAuthDto } from './dto/create-auth.dto';
        import { UpdateAuthDto } from './dto/update-auth.dto';
        import { Response } from 'express';
        import { JwtGuard } from './jwt/auth.guard';

        @Controller({
          path: 'auth',
          version: '1'
        })
        export class AuthController {
          constructor(private readonly authService: AuthService) {}

          @Post('/login')
          async create(
            @Body() createAuthDto: CreateAuthDto,
            @Res() res: Response
          ): Promise<Response> {
            const result = await this.authService.create(createAuthDto);
            if(result.success === false)
            {
              return res.status(400).json({
                ...result
              });
            }
            return res.status(200).json({
              ...result
            });
          }

          @UseGuards(JwtGuard)
          @Get('/profile')
          async getProfile(
            @Res() res: Response,
            @Request() req: any
          ): Promise<Response> {
            console.log(req.user);
            const id = req.user.id;
            const result = await this.authService.getProfile(id);
            if(result.success === false)
            {
              return res.status(400).json({
                ...result
              });
            }
            return res.status(200).json({
              ...result
            });
          }
        }
