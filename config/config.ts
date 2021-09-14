//mudar para utilizar .env
//o instrutor já expoe a instancia da classe, é a melhor solução?

class Configs {
    secret: string = "changeme";
}

export default new Configs();