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
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import {DividerModule} from 'primeng/divider';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {MenuModule} from 'primeng/menu'
import {ScrollTopModule} from 'primeng/scrolltop'
import { TooltipModule } from 'primeng/tooltip'
import { TimeAgoPipe } from '../util/time-ago-util';
import { AutoFocusModule } from 'primeng/autofocus';
import {BlockUIModule} from 'primeng/blockui';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TieredMenuCustomComponent } from '../components/tiered-menu/tiered-menu.component';
import { GalleriaModule } from 'primeng/galleria';
import { SkeletonModule } from 'primeng/skeleton'

ToastModule
@NgModule({
    declarations: [
        TimeAgoPipe
    ],
    imports: [
        ChipModule,
        ConfirmPopupModule,
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
        CalendarModule,
        StepsModule,
        DialogModule,
        ToolbarModule,
        ToastModule,
        TagModule,
        DividerModule,
        MenuModule,
        ScrollTopModule,
        TooltipModule,
        AutoFocusModule,
        BlockUIModule,
        ConfirmDialogModule,
        TieredMenuCustomComponent,
        GalleriaModule,
        SkeletonModule,
    ],
    exports: [
        ChipModule,
        ConfirmPopupModule,
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
        CalendarModule,
        StepsModule,
        ToastModule,
        DialogModule,
        ToolbarModule,
        TagModule,
        DividerModule,
        MenuModule,
        ScrollTopModule,
        TooltipModule,
        TimeAgoPipe,
        AutoFocusModule,
        BlockUIModule,
        ConfirmDialogModule,
        TieredMenuCustomComponent,
        GalleriaModule,
        SkeletonModule,
    ]
})
export class ShareModule { }
