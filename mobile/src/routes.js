// este container é o que vai em torno de toda a nossa aplicação. Exportamos ele, para que seja usado no inicio da aplicação, que no nosso caso é o App.js
import { createAppContainer } from 'react-navigation';
// o react navigation possuí muitos tipos de "estilos de navegação" ,bottons, drawers, stacks(pilhas) e outros. E lembrar de colocar qualquer tipo de navegação dentro do createAppContainer.
// e nesta usaremos o stack
import { createStackNavigator } from 'react-navigation-stack';

// import as paginas para que elas possam ser roteadas
import Main from './pages/Main';
import User from './pages/User';
import Starred from './pages/Starred';


const Routes = createAppContainer(
    createStackNavigator({
        Main,
        User,
        Starred,
    }, {
        // confirações adicionais do createStackNavigator.
        //defaultNavigationOptions, todas as telas vão erdar as opções que forem configuradas. 
        defaultNavigationOptions: {
            headerBackTitleVisible: false, //para tirar o texto de BACK que aparece quando vc muda de page. Isto é do IOS. Aparece somente o icone <-
            headerTitleAlign: 'center', //coloca o titulo do cabeçario no centro (para android)
            headerStyle: { 
                backgroundColor: 'black',                    
            },
            headerTintColor: '#fff', //cor do titulo

            // OBS.: Para alterar o statusBar, que é o icones do telefone, vá para o App.js
        }   
    })
);


export default Routes;