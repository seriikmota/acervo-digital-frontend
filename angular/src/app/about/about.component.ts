import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  creatorsColumn1 = [
    {
      name: 'Davi ',
      email: 'luizfelipedn57@gmail.com',
      phone: '+55 (62) 99688-5739',
      git: "https://github.com/Davii-code"
    },
    {
      name: 'Denis',
      email: 'luizfelipedn57@gmail.com',
      phone: '+55 (62) 99688-5739',
      git: "https://github.com/marcos-abs"
    },
    {
      name: 'Erik Mota',
      email: 'seriikmota.dev@gmail.com',
      phone: '+55 (62) 98429-1788',
      git: "https://github.com/seriikmota"
    }
  ];
  creatorsColumn2 = [
    {
      name: 'Lucas Apparecido de Oliveira',
      email: 'luizfelipedn57@gmail.com',
      phone: '+55 (62) 99688-5739',
      git: "https://github.com/LucasApparecido"
    },
    {
      name: 'Luiz Felipe de Almeida e Silva',
      email: 'luizfelipedn57@gmail.com',
      phone: '+55 (62) 99688-5739',
      git: "https://github.com/Lipolys"
    },
    {
      name: 'Marcos Antônio Barbosa de Souza',
      email: 'desouza.marcos@outlook.com.br',
      phone: '+55 (62) 99208-9474',
      git: "https://github.com/marcos-abs"
    }
  ]

  redirectToWhatsapp(numero: string) {
    const cleanedNumber = numero.replace(/\D/g, '');
    window.open('https://wa.me/' + cleanedNumber + '?text=Quero%20conversar%20sobre%20o%20seu%20trabalho!', '_blank');
  }
}
