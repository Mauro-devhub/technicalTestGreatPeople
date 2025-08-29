import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JWT } from "../constants/jwt.contant";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/modules/shared/decorators/roles.decorator";
import { IS_PUBLIC_KEY } from "src/modules/shared/decorators/public.decorator";

@Injectable()
export class AuthenticationJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: JWT.secret
        }
      );

      request['user'] = payload;

      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY, 
        [context.getHandler(), context.getClass()]
      );

      if (isPublic) {
        return true;
      }

      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );

      if (requiredRoles && !requiredRoles.includes(payload.role)) {
        throw new ForbiddenException("You do not have permission to access this resource");
      }
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}