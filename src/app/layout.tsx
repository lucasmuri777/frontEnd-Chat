import StyledComponentsRegistry from './lib/registry';
import { UserProvider } from '@/contexts/UserContext';
import { GlobalStyle } from '../styles/global';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <>
          <GlobalStyle />
          <StyledComponentsRegistry>
            <UserProvider>
              {children}
            </UserProvider>
          </StyledComponentsRegistry>
        </>
      </body>
    </html>
  )
}
