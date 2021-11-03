import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

const request =  chai.request('https://viacep.com.br/ws/');

describe('Buscar CEP', () => {
    context('quando informo um cep válido', () => {
        it('então os dados do endereço devem ser retornados corretamente', (done) => {
            request
                .get('01001000/json/')
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body).to.property('cep');
                    expect(res.body).to.property('logradouro');
                    expect(res.body).to.property('complemento');
                    expect(res.body).to.property('bairro');
                    expect(res.body).to.property('localidade');
                    expect(res.body).to.property('uf');
                    expect(res.body).to.property('ibge');
                    expect(res.body).to.property('gia');
                    expect(res.body).to.property('ddd');
                    expect(res.body).to.property('siafi');
                    expect(res.body.cep).to.contains('01001');
                    expect(res.body.bairro).to.be.an('string')
                    expect(res.body).to.not.be.an('array');
                    done();
                })
        })
    })

    context('quando informo um cep inexistente', () => {
        it('então deve ser retornado que houve um erro', (done) => {
            request
                .get('33490268/json/')
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.erro).to.equals(true);
                    done();
                })
        })
    })

    context('quando informo um cep inválido', () => {
        it('então não devem ser retornados dados do endereço', (done) => {
            request
                .get('1111111/json/')
                .end((err, res) => {
                    expect(res).to.has.status(400);
                    expect(res).to.be.html;
                    done();
                })
        })
    })
})
