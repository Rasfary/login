import { Routes } from '@angular/router';
import { Dashboard } from './componente/dashboard/dashboard';
import { Login } from './componente/login/login';
import { authGuard } from './guards/auth-guard';
import { Home } from './componente/home/home';
import { Lista } from './componente/lista/lista';
import { Resgister } from './componente/resgister/resgister';


export const routes: Routes = [
    
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },   
    {
        path: 'login',
        component: Login
    },   
    {
        path: 'register',
        component: Resgister
    },  
    {
        path: 'home',
        component: Home,
        canActivate: [authGuard]
    }, 
    {
        path: 'lista',
        component: Lista,
        canActivate: [authGuard]
    },
    
    {
        path: 'Dashboard',
        // Importa o componente só quando o usuário clica
        loadComponent: () => 
            import('./componente/dashboard/dashboard')
                .then(m=> m.Dashboard),
                canActivate:[authGuard]
    },
    
    {
        path: '**', //RotaCoringa (404)
        redirectTo: ''
    },
    
    
];
