import React from 'react';
import Box from '@material-ui/core/Box';
import { Switch, Route } from 'react-router-dom';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import { QueryClient, QueryClientProvider, QueryFunctionContext } from 'react-query';
import axios from 'axios';
import Nav from 'components/Nav/Nav';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }: QueryFunctionContext) => {
        const { data } = await axios.get(`${queryKey[0]}`);
        return data;
      },
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box height="100vh" className="flex-col" overflow="auto">
        <Nav />
        <Switch>
          <Route component={Login} path="/login" />
          <Route component={Dashboard} path="/" />
        </Switch>
      </Box>
    </QueryClientProvider>
  );
}

export default App;
