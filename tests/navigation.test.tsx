import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Header from "@/components/Header";
import Home from "@/app/page";
import Servicos from "@/app/servicos/page";
import Sobre from "@/app/sobre/page";
import Contato from "@/app/contato/page";
import NotFound from "@/app/not-found";

afterEach(cleanup);

describe("navegação", () => {
  it("o Header aponta para todas as páginas", () => {
    render(<Header />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    for (const href of ["/", "/servicos", "/sobre", "/contato"]) {
      expect(hrefs).toContain(href);
    }
  });

  it.each([
    ["/", Home],
    ["/servicos", Servicos],
    ["/sobre", Sobre],
    ["/contato", Contato],
    ["404", NotFound],
  ])("a página %s renderiza com um título", (_, Page) => {
    render(<Page />);
    expect(screen.getAllByRole("heading", { level: 1 }).length).toBeGreaterThan(0);
  });

  it("a 404 leva de volta ao início", () => {
    render(<NotFound />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toContain("/");
  });
});
