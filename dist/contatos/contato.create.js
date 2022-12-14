import { Contato } from "./contato.model.js";
import { ContatoRepositoryLocalStorage } from "./contato.repository.local-storage.js";
class ContatoPaginaCadastro {
    constructor(repositorioContatos, id) {
        this.repositorioContatos = repositorioContatos;
        this.configurarElementos();
        if (id) {
            this.idSelecionado = id;
            const contatoSelecionado = this.repositorioContatos.selecionarPorId(id);
            if (contatoSelecionado)
                this.preencherFormulario(contatoSelecionado);
        }
    }
    preencherFormulario(contatoSelecionado) {
        this.txtNome.value = contatoSelecionado.nome;
        this.txtTelefone.value = contatoSelecionado.telefone;
        this.txtEmail.value = contatoSelecionado.email;
        this.txtEmpresa.value = contatoSelecionado.empresa;
        this.txtCargo.value = contatoSelecionado.cargo;
    }
    configurarElementos() {
        this.txtNome = document.getElementById("txtNome");
        this.txtTelefone = document.getElementById("txtTelefone");
        this.txtEmail = document.getElementById("txtEmail");
        this.txtEmpresa = document.getElementById("txtEmpresa");
        this.txtCargo = document.getElementById("txtCargo");
        this.btnInserir = document.getElementById("btnInserirContato");
        this.btnInserir.addEventListener("click", (_evt) => this.gravarRegistros());
    }
    gravarRegistros() {
        const contato = this.obterDadosFormulario();
        if (!this.idSelecionado)
            this.repositorioContatos.inserir(contato);
        else
            this.repositorioContatos.editar(contato.id, contato);
        window.location.href = "contato.list.html";
    }
    obterDadosFormulario() {
        const nome = this.txtNome.value;
        const telefone = this.txtTelefone.value;
        const email = this.txtEmail.value;
        const empresa = this.txtEmpresa.value;
        const cargo = this.txtCargo.value;
        let contato = null;
        if (!this.idSelecionado)
            contato = new Contato(nome, telefone, email, empresa, cargo);
        else
            contato = new Contato(nome, telefone, email, empresa, cargo, this.idSelecionado);
        return contato;
    }
}
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
new ContatoPaginaCadastro(new ContatoRepositoryLocalStorage(), id);
