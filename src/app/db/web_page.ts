import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppDbCommon } from './common';
import { DbTableRecordsService } from './service';
import { SelectItem } from 'primeng/primeng';

interface Phone {
    web_domain;
    phone_number;
    use;
    other_use;
}

@Component({
    selector: 'app-db-web_page',
    templateUrl: './web_page.html'
})
export class DbWebPagesComponent extends AppDbCommon implements OnInit {

    private usages = [];
    private sectionTypes = [];
   
     constructor(
        public dataService: DbTableRecordsService
    ) {
        super(dataService);
    }

    ngOnInit() {
        this.subTitle = 'Web Page Details';
        this.summary = 'All web pages for the punblic website';
        this.dbTableName = 'web_pages';

        this.usages.push({label:'For Home Page', value:'for home page'});
        this.usages.push({label:'For About us Page', value:'for about us page', selected: true});
        this.usages.push({label:'Other', value:'other'});

        this.sectionTypes.push({label:'Paragraph', value:'paragraph', selected: true});
        this.sectionTypes.push({label:'Slider', value:'slider'});
        
        this.recordForm = new FormGroup({
            web_domain: new FormControl('', [Validators.required]),
            use: new FormArray(
                [this.initStringNoValidatorsControl()], Validators.compose([Validators.minLength(1)])
            ),
            other_use: new FormControl('', [Validators.pattern('^[0-9a-zA-Z ]{3,15}$')]),
            key_words: new FormControl('', [Validators.required]),
            title: new FormControl('', [Validators.required]),
            sections: new FormArray(
                [this.initSection()], Validators.compose([Validators.minLength(1)])
            ),
        });

        this.getTableRecordsValue();
        
    }
    
    onRowSelect(event) {
        this.newRecord = false;
        this.title = 'Update ' + this.subTitle;
        this.displayDialog = true; 

        this.recordForm.reset({
            web_domain: event.data.web_domain,
            gender: event.data.gender
        });

        this.recordForm = this.setSubRecord(
            this.recordForm, 
            'sections', 
            event.data.sections
        );

        this.recordForm['sections'] = this.setSubRecord(
            this.recordForm['sections'], 
            'slides', 
            event.data.sections.slides
        ); 
    }

    initSection() {
        return new FormGroup({
            type: new FormControl('', [Validators.pattern('^[a-zA-Z.]+$')]),
            paragraph: new FormControl(''),
            slides: new FormArray(
                [this.initStringNoValidatorsControl()],  Validators.compose([Validators.minLength(1)])
            ),
        });
    }

}