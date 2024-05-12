import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class CommentsGuard implements CanActivate{

    constructor(private jwtService: JwtService){

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try{
            const userId: number = +req.params.id;

            const token: string = req.headers.authorization.split(' ')[1];

            const candidateId: number = this.jwtService.verify(token).id;

            if (candidateId === userId){
                return true;
            } else {
                throw new ForbiddenException();
            }
        } catch(e){
            console.log(e);
            throw new ForbiddenException({ message: 'Not allowed to manipulate this column' });
        }
    }
}