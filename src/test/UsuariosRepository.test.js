const LoginModel = require("../models/LoginModel");
const { FindAllLogin, FindOneLogin, CreateLogin, deleteLogin, updateLogin } = require("../repository/LoginRepository");

describe("Test Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should findAll Response ok", async () => {
    jest
      .spyOn(LoginModel, "find")
      .mockReturnValue(Promise.resolve([{ email: "test@gmail.com" }]));

    const expected = await FindAllLogin();
    console.log(expected);
    expect(expected.status).toBe(200);
  });

  it("Should FindAll response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    jest
      .spyOn(LoginModel, "find")
      .mockImplementationOnce(() =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindAllLogin();
    } catch (error) {
      expect(error.status).toEqual(500);
    }
  });

  it("Should findOne Login response ok", async () => {
    const loginId = "123";
    const login = { _id: loginId, name: "User1", usuario: "user1" };

    jest
      .spyOn(LoginModel, "findOne")
      .mockImplementationOnce(() => Promise.resolve(login));

    const result = await FindOneLogin(loginId);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registro Encontrado correctamente");
    expect(result.result).toEqual(login);
  });

  it("Should findOne Login response Fail", async () => {
    const loginId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(LoginModel, "findOne")
      .mockImplementationOnce(() =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await FindOneLogin(loginId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Should save Login response ok", async () => {
    const login = new LoginModel();
    login.nombres = "test nombres";
    login.apellidos = "test apellidos";
    login.telefono = "test telefono";
    login.email = "test email";
    login.edad = "test edad";
    login.usuario = "userTest";

    jest
      .spyOn(LoginModel.prototype, "save")
      .mockImplementationOnce(() => Promise.resolve(login));

    const result = await CreateLogin(login);
    console.log(result);
    expect(result.status).toBe(201);
    expect(result.message).toBe("Se ha creado el Login Correctamente");
  }, 15000);

  it("Should save Login response Fail", async () => {
    const expectedErrorData = { errorMessage: "test error scenario" };
    const login = new LoginModel();
    login.nombres = "test nombres";
    login.apellidos = "test apellidos";
    login.telefono = "test telefono";
    login.email = "test email";
    login.edad = "test edad";
    login.usuario = "userTest";

    jest
      .spyOn(LoginModel.prototype, "save")
      .mockImplementationOnce(() => Promise.reject(new Error(expectedErrorData)));

    try {
      await CreateLogin(login);
    } catch (error) {
      expect(error.status).toBe(500);
      expect(error.message).toBe("Ocurrió un error en el servidor");
    }
  }, 15000);

  it("Should delete Login response ok", async () => {
    const loginId = "123";
    const login = { _id: loginId, name: "User1", usuario: "user1" };

    jest
      .spyOn(LoginModel, "findByIdAndDelete")
      .mockImplementationOnce(() => Promise.resolve(login));

    const result = await deleteLogin(loginId);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registro Eliminado correctamente");
    expect(result.result).toEqual(login);
  });

  it("Should delete Login response Fail", async () => {
    const loginId = "123";
    const expectedErrorData = { errorMessage: "test error scenario" };

    jest
      .spyOn(LoginModel, "findByIdAndDelete")
      .mockImplementationOnce(() =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await deleteLogin(loginId);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });

  it("Should update Login response ok", async () => {
    const loginId = "654afad180c86c12c0c29d14";

    const login = new LoginModel();
    login.nombres = "test nombres";
    login.apellidos = "test apellidos";

    jest
      .spyOn(LoginModel, "findOneAndUpdate")
      .mockImplementationOnce(() => Promise.resolve(login));

    const result = await updateLogin(loginId, login);

    expect(result.status).toBe(200);
    expect(result.message).toBe("Registro Actualizado correctamente");
  });

  it("Should update Login response Fail", async () => {
    const loginId = "654afad180c86c12c0c29d14";
    const expectedErrorData = { errorMessage: "test error scenario" };

    const login = new LoginModel();
    login.nombres = "test nombres";
    login.apellidos = "test apellidos";

    jest
      .spyOn(LoginModel, "findOneAndUpdate")
      .mockImplementationOnce(() =>
        Promise.reject(new Error(expectedErrorData))
      );

    try {
      await updateLogin(loginId, login);
    } catch (error) {
      expect(error.status).toBe(500);
    }
  });
});
