import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logoFigura from "../../assets/Icon (Figura).png";
import logoTexto from "../../assets/Icon (Texto).png";
import notificacoes from "../../assets/notificacoes.png";
import perfil from "../../assets/perfil.jpg";

type MenuName = "cadastros" | "vendas" | "estoque" | "financeiro" | "perfil";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const buttonRefs = useRef<{
    [key in MenuName]?: HTMLButtonElement | HTMLImageElement | null;
  }>({});

  const dropdownRefs = useRef<{ [key in MenuName]?: HTMLUListElement | null }>(
    {}
  );

  // ==== AUTO-FLIP PROFISSIONAL ====
  const calculateDropdownPosition = (menu: MenuName) => {
    const btn = buttonRefs.current[menu];
    const dropdown = dropdownRefs.current[menu];
    if (!btn || !dropdown) return;

    const btnRect = btn.getBoundingClientRect();
    const dropRect = dropdown.getBoundingClientRect();

    let left = btnRect.left + window.scrollX;
    const spaceRight = window.innerWidth - (btnRect.left + dropRect.width);

    if (spaceRight < 10) {
      left = btnRect.right - dropRect.width + window.scrollX;
    }

    if (left < 10) left = 10;

    setMenuPos({
      top: btnRect.bottom + window.scrollY,
      left,
    });
  };

  const toggleMenu = (menu: MenuName) => {
    if (openMenu === menu) {
      setOpenMenu(null);
    } else {
      setOpenMenu(menu);
      setTimeout(() => calculateDropdownPosition(menu), 5);
    }
  };

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const insideButton = Object.values(buttonRefs.current).some(
        (btn) => btn && btn.contains(event.target as Node)
      );
      const insideDropdown = Object.values(dropdownRefs.current).some(
        (drop) => drop && drop.contains(event.target as Node)
      );

      if (!insideButton && !insideDropdown) setOpenMenu(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderDropdown = (
    menu: MenuName,
    links: { to: string; label: string; icon?: string }[]
  ) => {
    if (openMenu !== menu) return null;

    return (
      <ul
        ref={(el) => {
          dropdownRefs.current[menu] = el; // << corrigido (sem return)
        }}
        className={styles.dropdown}
        style={{
          top: `${menuPos.top}px`,
          left: `${menuPos.left}px`,
        }}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setOpenMenu(null)}
            className={styles.dropdownItem}
          >
            <li>
              {link.icon && (
                <span style={{ marginRight: "8px" }}>{link.icon}</span>
              )}
              {link.label}
            </li>
          </Link>
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
              { to: "/vendas/registrar", label: "Registrar Venda" },
              { to: "/vendas/historico", label: "Histórico de Vendas" },
              { to: "/vendas/relatorios", label: "Relatórios de Vendas" },
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
              { to: "/estoque/inventario", label: "Inventário Geral" },
              { to: "/estoque/movimentacao", label: "Movimentação de Estoque" },
              {
                to: "/estoque/baixo-estoque-produtos",
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
              {
                to: "/financeiro/fechamento-caixa",
                label: "Fechamento de Caixa",
              },
              { to: "/financeiro/fluxo-caixa", label: "Fluxo de Caixa" },
              { to: "/financeiro/contas-pagar", label: "Contas a Pagar" },
              {
                to: "/financeiro/relatorios-financeiros",
                label: "Relatórios Financeiros",
              },
            ])}
          </div>
        </div>
      </div>

      {/* Perfil */}
      <div className={styles.right}>
        <img
          className={styles.notificacoes}
          src={notificacoes}
          alt="notificações"
        />

        <img
          className={styles.perfil}
          src={perfil}
          alt="perfil"
          ref={(el) => {
            buttonRefs.current["perfil"] = el;
          }}
          onClick={() => toggleMenu("perfil")}
        />

        {renderDropdown("perfil", [
          { to: "/meu-perfil", label: "Meu Perfil", icon: "👤" },
          { to: "/configuracoes", label: "Configurações", icon: "⚙️" },
          { to: "/ajuda", label: "Ajuda", icon: "❓" },
          { to: "/logout", label: "Sair", icon: "🚪" },
        ])}
      </div>
    </nav>
  );
}
