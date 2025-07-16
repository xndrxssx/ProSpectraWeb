"use client";

import { Calendar, Home, Inbox, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarHeader, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { AudioWaveform, HardDriveUpload, ChartColumn, History, FileText, SearchCheck, Users, LogOut } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import Link from "next/link"; // Usando o Link do Next.js
import { useState } from "react"; // Importando o hook useState
import { useRouter } from "next/navigation";
import useAuth from '@/hooks/useAuth'; // Importando o hook useAuth

export function CustomSidebar({ children }: { children?: React.ReactNode }) {
  // Gerencia o estado de qual submenu está aberto
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  // Função para alternar o submenu
  const handleCollapsibleToggle = (id: string) => {
    setOpenCollapsible((prev) => (prev === id ? null : id)); // Fecha o submenu se já estiver aberto
  };

  const router = useRouter();

  const handleLogout = () => {
    // Limpar dados de autenticação
    localStorage.removeItem("token"); // Ou use cookies, conforme necessário

    // Redirecionar para a página de login
    router.push("/login");
  };

  const { isAdmin, userType, setToken} = useAuth();

  // Exemplo de como utilizar
  console.log("isAdmin:", isAdmin);
  console.log("userType:", userType);

  return (
    <Sidebar className="w-[230px]">
      <SidebarHeader className="flex items-center gap-2 p-4 bg-[#165a16] text-[#ffffff]">
        <AudioWaveform className="w-5 h-5" />
        <h1 className="text-base font-bold text-[#ffffff]">PROSPECTRA</h1>
      </SidebarHeader>

      <SidebarContent className="bg-[#165a16] text-[#ffffff]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuButton asChild>
                <Link href="/home" className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                  <Home className="mr-2" />
                  Home
                </Link>
              </SidebarMenuButton>

              {/* Submenu de Enviar dados */}
              <Collapsible open={openCollapsible === 'uploadData'} onOpenChange={() => handleCollapsibleToggle('uploadData')}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                      <HardDriveUpload className="mr-2" /> Enviar dados
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className="gap-3 py-2 ">
                      <SidebarMenuSubItem className="hover:bg-white  rounded-md p-1 hover:text-black transition-all duration-350 ease-in-out">
                        <Link href="/local" className=" text-inherit ">Local</Link>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem className="hover:bg-white  rounded-md p-1 hover:text-black transition-all duration-350 ease-in-out">
                        <Link href="/device" className="text-inherit ">Dispositivo</Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Aplicar modelos */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                  <SearchCheck className="mr-2" />
                  <Link href="/apply-models" className="">Aplicar predições</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                  <ChartColumn className="mr-2" />
                  <Link href="/dashboard" className="">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Exportar */}
              {/* <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                  <FileText className="mr-2" />
                  <Link href="/reports" className="">Exportar</Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}

              {/* Histórico */}
              <SidebarMenuItem>
                    <SidebarMenuButton className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                      <History className="mr-2" />
                      <Link href="/history" className="">Histórico</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

              {/* Mostrar opções de admin apenas se isAdmin for verdadeiro */}
              {isAdmin && (
                <>
                  {/* Gerenciar usuários */}
                  <SidebarMenuItem>
                    <SidebarMenuButton className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                      <Users className="mr-2" />
                      <Link href="/users-management" className="">Gerenciar usuários</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  {/* Submenu de Configurações */}
                  <Collapsible open={openCollapsible === 'settings'} onOpenChange={() => handleCollapsibleToggle('settings')}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                          <Settings className="mr-2" /> Configurações
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="gap-3 py-2" >
                          <SidebarMenuSubItem className="hover:bg-white  rounded-md p-1 hover:text-black transition-all duration-350 ease-in-out">
                            <Link href="/edit-variety" className="text-inherit">Editar variedade</Link>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem className="hover:bg-white  rounded-md p-1 hover:text-black transition-all duration-350 ease-in-out">
                            <Link href="/edit-model" className="text-inherit">Treinar modelo preditivo</Link>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem className="hover:bg-white  rounded-md p-1 hover:text-black transition-all duration-350 ease-in-out">
                            <Link href="/upload-features" className="text-inherit">Dados para testes</Link>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem className="hover:bg-white  rounded-md p-1 hover:text-black transition-all duration-350 ease-in-out">
                            <Link href="/upload-targets" className="text-inherit">Alvos para testes</Link>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </>
              )}

              {/* Botão de logout */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleLogout}
                  className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out"
                >
                  <LogOut className="mr-2" />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="!p-0 m-0">
        <div className="text-center text-xs p-0 m-0 bg-[#165a16] text-[#ffffff]">
          <p className="text-white">© 2024 PROSPECTRA <br></br>
             Todos os direitos reservados</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default CustomSidebar;