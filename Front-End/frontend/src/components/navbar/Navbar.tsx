import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logoFigura from "../../assets/Icon (Figura).png";
import logoTexto from "../../assets/Icon (Texto).png";
import notificacoes from "../../assets/notificacoes.png";
import perfil from "../../assets/perfil.jpg";

type MenuName = "cadastros" | "vendas" | "estoque" | "financeiro";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<MenuName | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const buttonRefs = useRef<{ [key in MenuName]?: HTMLButtonElement | null }>(
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
      const clickedOnButton = Object.values(buttonRefs.current).some(
        (btn) => btn && btn.contains(event.target as Node)
      );
      if (!clickedOnButton) setOpenMenu(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src={logoFigura} alt="logoFigura" />
          <img src={logoTexto} alt="LogoTexto" />
        </div>

        <div className={styles.menu}>
          {/* --- Cadastros --- */}
          <div className={styles.menuItem}>
            <button
              ref={(el) => {
                buttonRefs.current["cadastros"] = el;
              }}
              onClick={() => toggleMenu("cadastros")}
            >
              Cadastros
            </button>
            {openMenu === "cadastros" && (
              <ul
                className={styles.dropdown}
                style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
              >
                <li>
                  <Link to="/clientes">Clientes</Link>
                </li>
                <li>
                  <Link to="/fornecedores">Fornecedores</Link>
                </li>
                <li>
                  <Link to="/produtos">Produtos</Link>
                </li>
              </ul>
            )}
          </div>

          {/* --- Vendas --- */}
          <div className={styles.menuItem}>
            <button
              ref={(el) => {
                buttonRefs.current["vendas"] = el;
              }}
              onClick={() => toggleMenu("vendas")}
            >
              Vendas
            </button>
            {openMenu === "vendas" && (
              <ul
                className={styles.dropdown}
                style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
              >
                <li>
                  <Link to="/pedidos">Pedidos</Link>
                </li>
                <li>
                  <Link to="/relatorios-vendas">Relatórios de Vendas</Link>
                </li>
              </ul>
            )}
          </div>

          {/* --- Estoque --- */}
          <div className={styles.menuItem}>
            <button
              ref={(el) => {
                buttonRefs.current["estoque"] = el;
              }}
              onClick={() => toggleMenu("estoque")}
            >
              Estoque
            </button>
            {openMenu === "estoque" && (
              <ul
                className={styles.dropdown}
                style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
              >
                <li>
                  <Link to="/inventario">Inventário</Link>
                </li>
                <li>
                  <Link to="/entrada-produtos">Entrada de Produtos</Link>
                </li>
              </ul>
            )}
          </div>

          {/* --- Financeiro --- */}
          <div className={styles.menuItem}>
            <button
              ref={(el) => {
                buttonRefs.current["financeiro"] = el;
              }}
              onClick={() => toggleMenu("financeiro")}
            >
              Financeiro
            </button>
            {openMenu === "financeiro" && (
              <ul
                className={styles.dropdown}
                style={{ top: `${menuPos.top}px`, left: `${menuPos.left}px` }}
              >
                <li>
                  <Link to="/fechamento-caixa">Fechamento de Caixa</Link>
                </li>
                <li>
                  <Link to="/fluxo-caixa">Fluxo de Caixa</Link>
                </li>
                <li>
                  <Link to="/contas-pagar">Contas a Pagar</Link>
                </li>
                <li>
                  <Link to="/relatorios-financeiros">
                    Relatórios Financeiros
                  </Link>
                </li>
              </ul>
            )}
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
