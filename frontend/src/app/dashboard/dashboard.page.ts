import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage {
  constructor(
    private router: Router,
    private auth: AuthService,
    private toastCtrl: ToastController
  ) {
    addIcons({
      logOutOutline: logOutOutline,
    });
  }

  goToAddMood() {
    this.router.navigate(['/add-mood']);
  }

  goToHistory() {
    this.router.navigate(['/history']);
  }

  async logout() {
    this.auth.logout();
    await this.presentToast('Logged out', 'success');
    this.router.navigate(['/login']);
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      color
    });
    toast.present();
  }
} 