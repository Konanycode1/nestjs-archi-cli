import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, UseGuards, Query, Request } from '@nestjs/common';
import { CreateUserDto } from 'features/user/core/dto/create-user.dto';
import { UpdateUserDto } from 'features/user/core/dto/update-user.dto';
import { Response } from 'express';
import { JwtGuard } from 'common/auth/jwt/auth.guard';
import { UsersService } from 'features/user/core/use-case/user.service';
@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response
  ):Promise<Response> {
    const userCreated = await this.usersService.create(createUserDto);
    if(userCreated.success === false)
    {
      return res.status(400).json({...userCreated});
    }
    return res.status(200).json({...userCreated});
  }

  @Get('/')
  @UseGuards(JwtGuard)
  async findAll(
    @Query() query: any,
    @Res() res: Response
  ): Promise<Response> {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const users = await  this.usersService.findAll(limit, page);
    if(users.success === false)
    {
      return res.status(400).json({...users});
    }
    return res.status(200).json({...users});
  }

  @Get("/statistic/")
  @UseGuards(JwtGuard)
  async userStatistic(
    @Res() res: Response,
    @Request() req: any
  ): Promise<Response> {
    const { id } = req.user;
    const users = await  this.usersService.statisticDelivery(id);
    if(users.success === false)
    {
      return res.status(400).json({...users});
    }
    return res.status(200).json({...users});
  }

  @Get('/delivery')
  @UseGuards(JwtGuard)
  async findAllDelivery(
    @Query() query: any,
    @Res() res: Response,
    @Request() req: any
  ): Promise<Response> {
    const { id } = req.user;
    const users = await  this.usersService.userDeliveryListe(id, query);
    if(users.success === false)
    {
      return res.status(400).json({...users});
    }
    return res.status(200).json({...users});
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
    const user = await this.usersService.findOne(id);
    if(user.success === false)
    {
      return res.status(400).json({...user});
    }
    return res.status(200).json({...user});
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response
  ): Promise<Response> {
    const user = await this.usersService.update(id, updateUserDto);
    if(user.success === false)
    {
      return res.status(400).json({...user});
    }
    return res.status(200).json({...user});

  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async remove(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
    const user = await this.usersService.remove(id);
    if(user.success === false)
    {
      return res.status(400).json({...user});
    }
    return res.status(200).json({...user});
  }
}
