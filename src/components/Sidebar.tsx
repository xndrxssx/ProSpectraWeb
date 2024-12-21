"use client";

import { Calendar, Home, Inbox, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarHeader, SidebarMenuSub, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { AudioWaveform, HardDriveUpload, ChartColumn, History, FileText, SearchCheck, Users } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import Link from "next/link"; // Usando o Link do Next.js
import { useState } from "react"; // Importando o hook useState

export function CustomSidebar({ children }: { children?: React.ReactNode }) {
  // Gerencia o estado de qual submenu está aberto
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  // Função para alternar o submenu
  const handleCollapsibleToggle = (id: string) => {
    setOpenCollapsible((prev) => (prev === id ? null : id)); // Fecha o submenu se já estiver aberto
  };

  return (
    <Sidebar className="w-45">
      {/* Header com Nome e Ícone */}
      <SidebarHeader className="flex items-center gap-2 p-4 bg-[#165a16] text-[#ffffff]">
        {/* Ícone do cabeçalho */}
        <AudioWaveform className="w-5 h-5" />
        <h1 className="text-base font-bold text-[#ffffff]">PROSPECTRA</h1> {/* Nome */}
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
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <Link href="/local" className="text-white">Local</Link>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Link href="/device" className="text-white">Dispositivo</Link>
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

              {/* Menu de Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                  <ChartColumn className="mr-2" /> 
                  <Link href="/dashboard" className="">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Menu de histórico */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                  <History className="mr-2" /> 
                  <Link href="/history" className="">Histórico</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Menu de histórico */}
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center hover:bg-[#ffffff] transition-all duration-350 ease-in-out">
                  <FileText className="mr-2" /> 
                  <Link href="/reports" className="">Exportar</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Aplicar modelos */}
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
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <Link href="/new-variety" className="text-white">Adicionar variedade</Link>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Link href="/edit-filter" className="text-white">Editar filtro</Link>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Link href="/edit-model" className="text-white">Editar modelo preditivo</Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="!p-0 m-0">
        <div className="text-center text-xs p-0 m-0 bg-[#165a16] text-[#ffffff]">
          <p className="text-white">© 2024 PROSPECTRA - Todos os direitos reservados</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default CustomSidebar;
