import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  UseGuards,
  Patch,
  Param,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUser } from '../users/dtos/create-user.dto';
import { CredentialsDto } from './dtos/credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { GetUser } from './decorations/get-user.decorator';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UserRole } from '../users/enum/user-roles.enum';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ReturnSignInDto } from './dtos/return-singn-in.dto';
import { UnauthorizedResponseDto } from './dtos/unauthorized-response.dto';
// import { GoogleOauthGuard } from './guards/google-oauth.guard';
// import * as cookieParser from 'cookie-parser';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiCreatedResponse({
    description: 'O cadastro foi realizado com sucesso.',
  })
  @ApiConflictResponse({
    description:
      'O endereço de email é único, não podendo ter dois ou mais usuários com o mesmo email.',
  })
  @ApiBadRequestResponse({
    description:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  @ApiUnprocessableEntityResponse({ description: 'As senhas não conferem' })
  @ApiInternalServerErrorResponse({
    description: 'Erro ao salvar o usuário no banco de dados.',
  })
  async signUp(
    @Body(ValidationPipe) createUser: createUser,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUser);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('/signin')
  @ApiCreatedResponse({
    description: 'Login do usuário e criação de token de autenticação feitos!',
    type: ReturnSignInDto,
  })
  @ApiUnauthorizedResponse({
    description: 'As credencias de login estão incorretas',
  })
  async signIn(
    @Body(ValidationPipe) credentiaslsDto: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentiaslsDto);
  }

  @Patch(':token')
  @ApiOkResponse({
    description: 'Email confirmado com sucesso!',
  })
  @ApiNotFoundResponse({ description: 'Token inválido!' })
  async confirmEmail(@Param('token') token: string) {
    await this.authService.confirmEmail(token);
    return {
      message: 'Email confirmado',
    };
  }

  @Post('/send-recover-email')
  @ApiCreatedResponse({
    description:
      'Lhe foi enviado um enviado um email com instruções para resetar sua senha',
  })
  @ApiBody({
    description: 'Email do usuário',
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'exemplo@email.com',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Não há usuário cadastrado com esse email.',
  })
  async sendRecoverPasswordEmail(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    await this.authService.sendRecoverPasswordEmail(email);
    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }

  @Patch('/reset-password/:token')
  @ApiOkResponse({
    description: 'Senha alterada com sucesso!',
  })
  @ApiNotFoundResponse({ description: 'Token inválido!' })
  async resetPassword(
    @Param('token') token: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.resetPassword(token, changePasswordDto);

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  @Patch(':id/change-password')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Senha alterada com sucesso!',
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponseDto,
    description: 'Não autorizado',
  })
  @ApiBadRequestResponse({
    description:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número ou um símbulo',
  })
  @ApiUnprocessableEntityResponse({ description: 'As senhas não conferem' })
  @UseGuards(AuthGuard())
  async changePassword(
    @Param('id') id: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
    @GetUser() user: User,
  ) {
    if (user.role !== UserRole.ADMIN && user.id.toString() !== id)
      throw new UnauthorizedException(
        'Você não tem permissão para realizar esta operação',
      );

    await this.authService.changePassword(id, changePasswordDto);
    return {
      message: 'Senha alterada',
    };
  }

  @Get('/me')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Retorna o dados pessoais do usuário',
    type: User,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedResponseDto,
    description: 'Não autorizado',
  })
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): User {
    return user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req) {
    return await this.authService.googleLogin(req);
  }
}
