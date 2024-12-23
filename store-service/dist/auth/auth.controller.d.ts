import { AuthService } from './auth.service';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Login(createAuthDto: LoginDto): Promise<AuthEntity>;
}
