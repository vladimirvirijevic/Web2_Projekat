import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BonusInfo } from 'src/app/models/bonusInfo';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-bonus',
  templateUrl: './admin-bonus.component.html',
  styleUrls: ['./admin-bonus.component.css']
})
export class AdminBonusComponent implements OnInit {
  editBonusForm: FormGroup;
  bonusInfo: BonusInfo = new BonusInfo();

  mainErrorMessage = "There was an error!";
  showMainErrorMessage = false;

  mainSuccessMessage = "Success!";
  showMainSuccessMessage = false;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {
    this.editBonusForm = this.formBuilder.group({
      'flightBonus': ['', [Validators.required]],
      'rentacarBonus': ['', [Validators.required]]
    });

    this.bonusInfo.flightBonus = 0;
    this.bonusInfo.rentacarBonus = 0;
   }

   get flightBonus() { return this.editBonusForm.get('flightBonus'); }
   get rentacarBonus() { return this.editBonusForm.get('rentacarBonus'); }

  ngOnInit(): void {
    this.getBonusInfo();
  }

  getBonusInfo() {
    this.adminService.getBonusInfo()
      .subscribe(
        data => {
          if (data) {
            this.bonusInfo = data;
            
          }
          this.setEditForm();
        }
      )
  }

  setEditForm() {
      this.editBonusForm.controls.flightBonus.setValue(this.bonusInfo.flightBonus);
      this.editBonusForm.controls.rentacarBonus.setValue(this.bonusInfo.rentacarBonus);
  }

  

  onSubmit() {
    if (this.editBonusForm.invalid) {
      return;
    }

    const editInfo = {
      flightBonus: this.flightBonus.value,
      rentacarBonus: this.rentacarBonus.value
    };

    this.adminService.editBonusInfo(editInfo)
      .subscribe(
        data => {
          this.getBonusInfo();
          this.showMainErrorMessage = false;
          this.showMainSuccessMessage = true;
        },
        error => {
          this.showMainErrorMessage = true;
          this.showMainSuccessMessage = false;
        }
      )
  }
}
