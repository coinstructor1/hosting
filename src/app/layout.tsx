"use client";
import { GameProvider } from "@/app/context/GameContext";
import { UserProvider } from "@/app/context/UserContext";
import { Provider } from "react-redux";
import { store } from "../store/store";
import MiningProvider from "./components/MiningProvider";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <GameProvider>
            <UserProvider>
              <MiningProvider>
                <div className="min-h-screen flex flex-col">
                  <div className="flex-grow overflow-y-auto pb-16">
                    {children}
                  </div>
                  <NavBar />
                </div>
              </MiningProvider>
            </UserProvider>
          </GameProvider>
          <Modal />
        </Provider>
      </body>
    </html>
  );
}
