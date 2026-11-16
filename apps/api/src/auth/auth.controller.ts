import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Public } from '@nestjs/authentication';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { openApiSchema } from '../common/openapi.js';
import { AuthService } from './auth.service.js';
import {
  createTokenSchema,
  tokenResponseSchema,
  type CreateTokenInput,
  type TokenResponse,
} from './auth.schemas.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('tokens')
  @HttpCode(201)
  @ApiOperation({ summary: 'Sign in: exchange credentials for a JWT access token' })
  @ApiCreatedResponse({
    description: 'Access token issued',
    schema: openApiSchema(tokenResponseSchema),
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  createToken(
    @Body({ schema: createTokenSchema }) body: CreateTokenInput,
  ): Promise<TokenResponse> {
    return this.authService.createToken(body);
  }
}
