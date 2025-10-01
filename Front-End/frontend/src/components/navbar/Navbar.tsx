import { useState, useRef, useEffect } from "react";
import styles from "./Navbar.module.css";
import logoFigura from "../../assets/Icon (Figura).png";
import logoTexto from "../../assets/Icon (Texto).png";

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
                <li>Clientes</li>
                <li>Fornecedores</li>
                <li>Produtos</li>
              </ul>
            )}
          </div>

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
                <li>Pedidos</li>
                <li>Relatórios de Vendas</li>
              </ul>
            )}
          </div>

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
                <li>Inventário</li>
                <li>Entrada de Produtos</li>
              </ul>
            )}
          </div>

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
                <li>Fechamento de Caixa</li>
                <li>Fluxo de Caixa</li>
                <li>Contas a Pagar</li>
                <li>Relatórios Financeiros</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <img src="" alt="notificações" />
        <img src="" alt="perfil" />
      </div>
    </nav>
  );
}
