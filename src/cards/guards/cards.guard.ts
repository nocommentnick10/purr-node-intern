import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { ColumnsService } from "src/columns/columns.service";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { CardsService } from "../cards.service";

@Injectable()
export class CardsGuard implements CanActivate{

    constructor(private jwtService: JwtService,
        private columnsService: ColumnsService,
        private cardsService: CardsService){

    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        try{
            const card = this.cardsService.getCardById(req.body.id);

            const token: string = req.headers.authorization.split(' ')[1];

            const candidateId: number = this.jwtService.verify(token).id;

            return this.columnsService.isColumnOwner(card, candidateId)
        } catch(e){
            throw new ForbiddenException({ message: 'Not allowed to manipulate this card'});
        }
    }
}