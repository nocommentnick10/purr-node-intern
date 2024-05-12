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

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try{
            const userId: number = +req.params.id;

            const token: string = req.headers.authorization.split(' ')[1];

            const candidateId: number = await this.jwtService.verify(token).id;

            if (candidateId !== userId){
                throw new Error;
            }

            const colId = await this.cardsService.getColumnIdByCard(req.params.cardId);

            return this.columnsService.isOwner(colId, candidateId);
        } catch(e){
            throw new ForbiddenException({ message: 'Not allowed to manipulate this card'});
        }
    }
}