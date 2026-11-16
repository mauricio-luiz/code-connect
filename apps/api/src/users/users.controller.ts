import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { CurrentUser, Public } from '@nestjs/authentication';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { openApiSchema } from '../common/openapi.js';
import type { PublicUser } from './user.js';
import { toUserResponse, UsersService } from './users.service.js';
import {
  createUserSchema,
  userResponseSchema,
  type CreateUserInput,
  type UserResponse,
} from './users.schemas.js';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({
    description: 'User created. `Location` points to the new user resource.',
    schema: openApiSchema(userResponseSchema),
  })
  @ApiConflictResponse({ description: 'Email already registered' })
  async create(
    @Body({ schema: createUserSchema }) body: CreateUserInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserResponse> {
    const user = await this.usersService.create(body);
    res.setHeader('Location', '/users/me');
    return toUserResponse(user);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the authenticated user' })
  @ApiOkResponse({
    description: 'The authenticated user',
    schema: openApiSchema(userResponseSchema),
  })
  @ApiUnauthorizedResponse({ description: 'Missing or invalid token' })
  me(@CurrentUser() user: PublicUser): UserResponse {
    return toUserResponse(user);
  }
}
