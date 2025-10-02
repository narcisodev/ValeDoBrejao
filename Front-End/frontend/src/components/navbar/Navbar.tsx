import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logoFigura from "../../assets/Icon (Figura).png";
import logoTexto from "../../assets/Icon (Texto).png";
import notificacoes from "../../assets/notificacoes.png";
import perfil from "../../assets/perfil.jpg";

type MenuName = "cadastros" | "vendas" | "estoque" | "financeiro";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  // Refs para os botões e dropdowns
  const buttonRefs = useRef<{ [key in MenuName]?: HTMLButtonElement | null }>(
    {}
  );
  const dropdownRefs = useRef<{ [key in MenuName]?: HTMLUListElement | null }>(
    {}
  );

  const toggleMenu = (menu: MenuName) => {
    if (openMenu === menu) {
      setOpenMenu(null);
    } else {
      const btn = buttonRefs.current[menu];
      if (btn) {
        const rect = btn.getBoundingClientRect();
        setMenuPos({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
      setOpenMenu(menu);
    }
  };

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedInsideButton = Object.values(buttonRefs.current).some(
        (btn) => btn && btn.contains(event.target as Node)
      );
      const clickedInsideDropdown = Object.values(dropdownRefs.current).some(
        (ul) => ul && ul.contains(event.target as Node)
      );

      if (!clickedInsideButton && !clickedInsideDropdown) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderDropdown = (
    menu: MenuName,
    links: { to: string; label: string }[]
  ) => {
    if (openMenu !== menu) return null;
    return (
      <ul
        ref={(el: HTMLUListElement | null) => {
          dropdownRefs.current[menu] = el;
        }}
        className={styles.dropdown}
        style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
      >
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} onClick={() => setOpenMenu(null)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoFigura} alt="logoFigura" />
            <img src={logoTexto} alt="LogoTexto" />
          </Link>
        </div>

        <div className={styles.menu}>
          {/* Cadastros */}
          <div className={styles.menuItem}>
            <button
              ref={(el) => {
                buttonRefs.current["cadastros"] = el;
              }}
              onClick={() => toggleMenu("cadastros")}
            >
              Cadastros
            </button>
            {renderDropdown("cadastros", [
              { to: "/usuarios", label: "Usuários" },
              { to: "/fornecedores", label: "Fornecedores" },
              { to: "/produtos", label: "Produtos" },
            ])}
          </div>

          {/* Vendas */}
          <div className={styles.menuItem}>
            <button
              ref={(el) => {
                buttonRefs.current["vendas"] = el;
              }}
              onClick={() => toggleMenu("vendas")}
            >
              Vendas
            </button>
            {renderDropdown("vendas", [
              { to: "/registrar-venda", label: "Registrar Venda" },
              { to: "/historico-vendas", label: "Histórico de Vendas" },
              { to: "/relatorios-vendas", label: "Relatórios de Vendas" },
            ])}
          </div>

          {/* Estoque */}
          <div className={styles.menuItem}>
            <button
              ref={(el) => {
                buttonRefs.current["estoque"] = el;
              }}
              onClick={() => toggleMenu("estoque")}
            >
              Estoque
            </button>
            {renderDropdown("estoque", [
              { to: "/inventario", label: "Inventário Geral" },
              {
                to: "/movimentacao-produtos",
                label: "Histórico de Movimentação",
              },
              {
                to: "/baixo-estoque-produtos",
                label: "Produtos de Baixo Estoque",
              },
            ])}
          </div>

          {/* Financeiro */}
          <div className={styles.menuItem}>
            <button
              ref={(el) => {
                buttonRefs.current["financeiro"] = el;
              }}
              onClick={() => toggleMenu("financeiro")}
            >
              Financeiro
            </button>
            {renderDropdown("financeiro", [
              { to: "/fechamento-caixa", label: "Fechamento de Caixa" },
              { to: "/fluxo-caixa", label: "Fluxo de Caixa" },
              { to: "/contas-pagar", label: "Contas a Pagar" },
              {
                to: "/relatorios-financeiros",
                label: "Relatórios Financeiros",
              },
            ])}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <img
          className={styles.notificacoes}
          src={notificacoes}
          alt="notificações"
        />
        <img className={styles.perfil} src={perfil} alt="perfil" />
      </div>
    </nav>
  );
}
