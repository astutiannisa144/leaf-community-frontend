import { ChipModule } from 'primeng/chip';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { NgModule } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ImageModule } from 'primeng/image';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { PasswordModule } from 'primeng/password';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [],
    imports: [
        ChipModule,
        TableModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        FileUploadModule,
        AvatarModule,
        ImageModule,
        BreadcrumbModule,
        CheckboxModule,
        RadioButtonModule,
        TabViewModule,
        TieredMenuModule,
        MenubarModule,
        ProgressBarModule,
        InputSwitchModule,
        CalendarModule
    ],
    exports: [
        ChipModule,
        TableModule,
        CardModule,
        ButtonModule,
        DropdownModule,
        InputTextareaModule,
        FileUploadModule,
        AvatarModule,
        ImageModule,
        BreadcrumbModule,
        CheckboxModule,
        RadioButtonModule,
        TabViewModule,
        InputTextModule,
        PasswordModule,
        TieredMenuModule,
        MenubarModule,
        ProgressBarModule,
        InputSwitchModule,
        CalendarModule
    ]
})
export class ShareModule { }