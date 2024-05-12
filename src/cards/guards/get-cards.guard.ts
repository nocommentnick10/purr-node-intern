import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class GetCardsGuard implements CanActivate{

    constructor(private jwtService: JwtService){

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try{
            const userId: number = +req.params.id;

            const token: string = req.headers.authorization.split(' ')[1];

            const candidateId: number = this.jwtService.verify(token).id;

            if (candidateId !== userId){
                throw new Error;
            }

            return true;
        } catch(e){
            console.log(e);
            throw new ForbiddenException({ message: 'Not allowed to get this user cards'});
        }
    }
}