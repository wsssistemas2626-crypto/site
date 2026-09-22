import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ContactForm from "@/components/ContactForm";
import { POST } from "@/app/api/contact/route";

const valid = { name: "Ana", email: "ana@exemplo.com", message: "Olá <b>WSS</b>" };

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );
}

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("rejeita JSON inválido e dados incompletos com 400", async () => {
    expect((await post("{")).status).toBe(400);
    expect((await post({ ...valid, email: "invalido" })).status).toBe(400);
    expect((await post({ ...valid, message: "" })).status).toBe(400);
  });

  it("retorna 503 sem RESEND_API_KEY", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect((await post(valid)).status).toBe(503);
  });

  it("envia pelo Resend com HTML escapado e reply_to", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "dest@wss.com");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const res = await post(valid);
    expect(res.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_test");
    const body = JSON.parse(init.body);
    expect(body.to).toEqual(["dest@wss.com"]);
    expect(body.reply_to).toBe(valid.email);
    expect(body.html).toContain("&lt;b&gt;WSS&lt;/b&gt;");
  });

  it("retorna 502 se o Resend falhar", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("erro", { status: 500 })));
    expect((await post(valid)).status).toBe(502);
  });
});

describe("ContactForm", () => {
  function fillAndSubmit() {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: valid.name } });
    fireEvent.change(screen.getByLabelText("E-mail"), { target: { value: valid.email } });
    fireEvent.change(screen.getByLabelText(/Descreva/), { target: { value: valid.message } });
    fireEvent.click(screen.getByRole("button", { name: /Enviar/ }));
  }

  it("envia os dados para /api/contact e mostra confirmação", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    fillAndSubmit();
    expect(await screen.findByText("Mensagem recebida.")).toBeTruthy();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(init.body)).toEqual(valid);
  });

  it("mostra erro quando a API falha", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("{}", { status: 503 })));
    fillAndSubmit();
    expect(await screen.findByText(/Não foi possível enviar/)).toBeTruthy();
  });
});
