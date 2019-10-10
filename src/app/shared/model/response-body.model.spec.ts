import { ResponseBody } from './response-body.model';

describe('Shared: Model: ResponseBody', () => {
  it('deve criar uma instância do model', () => {
    const responseBody = new ResponseBody<string>();
    responseBody.data = 'Dados do Response';
    responseBody.errors = [];
    responseBody.links = [];

    const expectedModel = {
      data: 'Dados do Response',
      errors: [],
      links: []
    };

    expect(responseBody).toEqual(jasmine.objectContaining(expectedModel));
  });
});
