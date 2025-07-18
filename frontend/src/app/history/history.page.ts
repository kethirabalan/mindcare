import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController, LoadingController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryPage implements OnInit {
  moods: any[] = [];
  loading: HTMLIonLoadingElement | null = null;

  constructor(
    private api: ApiService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private user: UserService,
    private router: Router
  ) {
    addIcons({
      arrowBackOutline: arrowBackOutline,
    });
  }

  async ngOnInit() {
    await this.presentLoading();
    this.api.getMyMoods().subscribe({
      next: async (data: any) => {
        this.moods = data;
        await this.dismissLoading();
      },
      error: async (err: any) => {
        await this.dismissLoading();
          this.presentToast(err.error?.message || 'Failed to load moods', 'danger');
        }
      });
  }

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading moods...'
    });
    await this.loading.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
} 