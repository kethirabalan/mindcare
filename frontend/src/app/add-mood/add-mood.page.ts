import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-add-mood',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './add-mood.page.html',
  styleUrls: ['./add-mood.page.scss']
})
export class AddMoodPage implements OnInit{
  moodForm: FormGroup;
  loading: HTMLIonLoadingElement | null = null;
  userId: string = '';
  userName: string = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private user: UserService
  ) {
    addIcons({
      arrowBackOutline: arrowBackOutline,
    });
    this.moodForm = this.fb.group({
      level: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
      notes: ['']
    });
  }

  async ngOnInit(): Promise<void> {
    // only get user id and name
    const user = await this.user.getUser().toPromise();
    this.userId = user.id;
    this.userName = user.name;
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Submitting mood...'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  async onSubmit() {
    if (this.moodForm.invalid) return;
    await this.presentLoading();
    await this.api.addMoodWithUserId(this.moodForm.value, this.userId).subscribe({
      next: async () => {
        await this.dismissLoading();
        this.presentToast('Mood added!');
        this.router.navigate(['/dashboard']);
      },
      error: async (err) => {
        await this.dismissLoading();
          this.presentToast(err.error?.message || 'Failed to add mood', 'danger');
        }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

} 