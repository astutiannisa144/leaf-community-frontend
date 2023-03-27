import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Observable, tap } from "rxjs";

@Injectable()
export class ResponInterceptor implements HttpInterceptor{
    constructor(private router :Router, private messageService: MessageService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        return next.handle(req).pipe(
            tap({
                next: (event)=>{
                    if(event instanceof HttpResponse){
                        if(event.body.message &&event.body.codeWarning && event.body.codeWarning==1){
                            this.messageService.add({severity:'warn', summary:'Service Message', detail:event.body.message});

                        }
                        else if(event.body.message){
                            this.messageService.add({severity:'success', summary:'Service Message', detail:event.body.message});
                        }   
                           
                    }
                },
                error: (event)=>{
                    if(event instanceof HttpErrorResponse){
                        if(event.status==400 && event.error.codeWarning){
                            this.messageService.add({severity:'warn', summary:'Service Message', detail:event.error.codeWarning});              
                        }
                        else{
                            this.messageService.add({severity:'error', summary:'Service Message', detail:event.error}); 
                            if(event.status==401){
                                this.router.navigateByUrl('/login')
                            }    
                        }
                          
                    }
                }
            })
        )
    }

}