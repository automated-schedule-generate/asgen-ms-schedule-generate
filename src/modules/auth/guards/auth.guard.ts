import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../../../common/decorators/set-metadata.decorator';
import axios, { type AxiosInstance } from 'axios';
import { Request } from 'express';
import { envData } from 'src/configuration';

@Injectable()
export class AuthGuard implements CanActivate {
  #api: AxiosInstance = axios.create({
    baseURL: envData.apiRestUrl,
    withCredentials: false,
  });
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.#extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Token doesn't exist");
    }

    try {
      await this.#api.get('users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const { data }: { data: string[] } = await this.#api.get('users/user_type', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return (
      Array.isArray(data) &&
      data.length > 0 &&
      data.some((permission) => permission === 'user-den' || permission === 'user-coordinator')
    );
  }

  #extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? ['', ''];
    return type === 'Bearer' ? token : undefined;
  }
}
