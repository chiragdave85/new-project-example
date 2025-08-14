// Overlay + keyboard controls; Theme toggle; MUI App layout
(function () {
  // Overlay
  const overlay = document.getElementById('wireOverlay');
  const overlayImg = overlay?.querySelector('img');
  let on = false; let dx = 0, dy = 0, s = 1, op = 0.25;
  function applyOverlay() { if (overlayImg) { overlayImg.style.opacity = String(op); overlayImg.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`; } }
  function toggleOverlay() { on = !on; overlay?.classList.toggle('on', on); overlay?.setAttribute('aria-hidden', on ? 'false' : 'true'); applyOverlay(); }
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'o' && e.shiftKey) { e.preventDefault(); toggleOverlay(); return; }
    if (!on) return; const step = e.shiftKey ? 16 : 4;
    if (e.key === 'ArrowLeft') { dx -= step; applyOverlay(); }
    if (e.key === 'ArrowRight') { dx += step; applyOverlay(); }
    if (e.key === 'ArrowUp') { dy -= step; applyOverlay(); }
    if (e.key === 'ArrowDown') { dy += step; applyOverlay(); }
    if (e.key === '+' || e.key === '=') { s = Math.min(2, +(s + 0.02).toFixed(2)); applyOverlay(); }
    if (e.key === '-' || e.key === '_') { s = Math.max(0.5, +(s - 0.02).toFixed(2)); applyOverlay(); }
    if (e.key.toLowerCase() === 'p') { op = Math.min(1, +(op + 0.05).toFixed(2)); applyOverlay(); }
    if (e.key.toLowerCase() === 'l') { op = Math.max(0, +(op - 0.05).toFixed(2)); applyOverlay(); }
  });

  // Theme toggle default light
  const rootEl = document.documentElement;
  function setTheme(mode) { rootEl.setAttribute('data-theme', mode); }
  setTheme('light');

  // MUI App
  const React = window.React;
  const ReactDOM = window.ReactDOM;
  const MUI = window.MaterialUI;
  if (!React || !ReactDOM || !MUI) return;

  const { createElement: h, useState } = React;
  const {
    ThemeProvider, createTheme, CssBaseline, useMediaQuery,
    Box, AppBar, Toolbar, IconButton, Typography, Divider, Drawer, Paper,
    Stack, Button, ButtonGroup, TextField, MenuItem, Select, InputLabel, FormControl, Link, Grid, Chip
  } = MUI;

  const themeBase = {
    shape: { borderRadius: 999 },
    typography: { fontFamily: 'BentonSansPro, Benton Sans, -apple-system, system-ui, Segoe UI, Roboto, Arial, sans-serif' },
    palette: { mode: (rootEl.getAttribute('data-theme') === 'dark') ? 'dark' : 'light', primary: { main: '#0e7afe' } }
  };
  let theme = createTheme(themeBase);

  const Icon = ({ name, size = 24 }) => h('span', { className: 'material-symbols-outlined', style: { fontSize: size } }, name);

  // Section 1: Header
  function Header({ onMenu }) {
    return h(AppBar, { position: 'static', elevation: 0, sx: { bgcolor: 'grey.50', color: 'text.primary' } },
      h(Toolbar, { sx: { px: 3, py: 2 } },
        h(Stack, { direction: 'row', spacing: 1.5, alignItems: 'center', component: Link, href: '#', underline: 'none', color: 'primary.main', sx: { '&:hover': { opacity: 0.9 } }, 'aria-label': 'AI Hub home' },
          h(Icon, { name: 'grid_view', size: 24 }),
          h(Typography, { variant: 'h6', sx: { fontWeight: 600 } }, 'AI Hub')
        ),
        h(Box, { sx: { flexGrow: 1 } }),
        h(IconButton, { onClick: onMenu, sx: { display: { md: 'none' } }, 'aria-label': 'Open navigation' }, h(Icon, { name: 'menu' }))
      )
    );
  }

  // Sidebar content (Section 4)
  function SidebarContent() {
    const Item = ({ icon, title, subtitle }) => h(Paper, {
      elevation: 0,
      sx: {
        p: 2,
        mb: 1.5,
        borderRadius: '8px',
        bgcolor: '#FAFAFA',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        transition: 'all .2s',
        '&:hover': { bgcolor: '#FAFAFA', boxShadow: '0 2px 6px rgba(0,0,0,0.10)' }
      },
      role: 'button',
      tabIndex: 0
    },
      h(Stack, { direction: 'row', spacing: 1.5, alignItems: 'center' },
        h(Icon, { name: icon }),
        h(Box, null,
          h(Typography, { variant: 'h6', sx: { fontSize: '16px', lineHeight: 1.25 } }, title)
        )
      )
    );

    return h(Box, { sx: { p: 2, bgcolor: '#FFFFFF', height: '100%', borderRight: '1px solid', borderColor: 'divider' } },
      h(Stack, { spacing: 2 },
        h(Stack, { alignItems: 'center', spacing: 2 },
          h(Icon, { name: 'grid_view' }),
          h(Typography, { variant: 'h6', sx: { fontWeight: 800 } }, 'AI Hub')
        ),
        h(Item, { icon: 'auto_awesome', title: 'Share Ideas and Feedback' }),
        h(Item, { icon: 'policy', title: 'AI Policy & Compliance' }),
        h(Item, { icon: 'chat', title: 'Contact AI Team' })
      )
    );
  }

  // Section 2: Welcome + Chat
  function WelcomeChat() {
    return h(Stack, { spacing: 3, sx: { width: { xs: '100%', md: 'min(60%, 980px)' }, mx: 'auto', px: 2, py: 4 } },
      h(Typography, { align: 'center', variant: 'h3', sx: { fontWeight: 700, mb: 4 } }, 'Welcome!'),
      h(Stack, { alignItems: 'center' },
        h(ButtonGroup, { variant: 'outlined', sx: { '& .MuiButton-root': { height: 48, px: 2 } } },
          h(Button, { variant: 'contained', startIcon: h(Icon, { name: 'grade' }) }, 'AI Model'),
          h(Button, { startIcon: h(Icon, { name: 'local_library' }) }, 'Knowledge Base'),
          h(Button, { startIcon: h(Icon, { name: 'smart_toy' }) }, 'AI Agent')
        )
      ),
      h(Paper, { elevation: 1, sx: { p: 2, borderRadius: 3 } },
        h(TextField, { fullWidth: true, multiline: true, minRows: 5, placeholder: 'Ask a question...', variant: 'outlined', sx: {
          '& .MuiOutlinedInput-root': { borderRadius: '16px' },
          '& fieldset': { border: 'none' },
          '& .MuiOutlinedInput-root.Mui-focused fieldset': { border: 'none' }
        } }),
        h(Stack, { direction: 'row', spacing: 2, alignItems: 'center', mt: 2, className: 'main-search-container' },
          h(Stack, { direction: 'row', spacing: 2 },
            h(FormControl, { size: 'small', sx: { minWidth: 140 } },
              h(InputLabel, null, 'Model'),
              h(Select, { defaultValue: 'ChatGPT', label: 'Model' },
                h(MenuItem, { value: 'ChatGPT' }, 'ChatGPT'),
                h(MenuItem, { value: 'GPT-4o' }, 'GPT-4o')
              )
            ),
            h(FormControl, { size: 'small', sx: { minWidth: 140 } },
              h(InputLabel, null, 'Version'),
              h(Select, { defaultValue: 'Latest', label: 'Version' },
                h(MenuItem, { value: 'Latest' }, 'Latest'),
                h(MenuItem, { value: '2025-07-15' }, '2025-07-15'),
                h(MenuItem, { value: '2025-05-01' }, '2025-05-01')
              )
            )
          ),
          h(Box, { sx: { flexGrow: 1 } }),
          h(IconButton, { color: 'default' }, h(Icon, { name: 'attach_file' })),
          h(Button, { variant: 'contained', color: 'primary', startIcon: h(Icon, { name: 'play_arrow' }) }, 'Send')
        )
      )
    );
  }

  // Section 3: Action Toolbar
  function ActionToolbar() {
    const Item = (label, icon) => h(Chip, {
      label,
      icon: h(Icon, { name: icon }),
      variant: 'outlined',
      sx: {
        height: 40, px: 1.5, py: 1,
        fontWeight: 500,
        borderRadius: 2,
        transition: 'all .2s',
        '&:hover': { boxShadow: 2, bgcolor: 'primary.main', color: 'primary.contrastText', '& .material-symbols-outlined': { color: 'inherit' }, borderColor: 'primary.main' }
      }
    });

    return h(Stack, { direction: 'row', spacing: 2, justifyContent: 'center', flexWrap: 'wrap' },
      Item('Write', 'edit'),
      Item('Analyze', 'analytics'),
      Item('Code', 'code'),
      Item('Ideate', 'lightbulb'),
      Item('Create', 'add')
    );
  }

  // Section 5: Content Library
  function ContentLibrary() {
    const Card = (title) => h(Paper, {
      elevation: 2, sx: { p: 2.5, borderRadius: 2, transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'scale(1.02)', boxShadow: 6 } }
    },
      h(Stack, { direction: 'row', alignItems: 'center' },
        h(Icon, { name: 'star' }),
        h(Typography, { variant: 'subtitle1', sx: { fontWeight: 600, ml: 1 } }, title),
        h(Box, { sx: { flexGrow: 1 } }),
        h(IconButton, null, h(Icon, { name: 'more_vert' }))
      ),
      h(Typography, { variant: 'body2', color: 'text.secondary', mt: 1 }, 'This is a placeholder description for the prompt template.')
    );

    return h(Stack, { spacing: 2, sx: { mt: 4 } },
      h(Stack, { direction: 'row', alignItems: 'center' },
        h(Typography, { variant: 'h6' }, 'Start from Prompt Library'),
        h(Box, { sx: { flexGrow: 1 } }),
        h(Link, { href: '#', underline: 'hover' },
          h(Stack, { direction: 'row', spacing: 0.5, alignItems: 'center' }, h('span', null, 'View All'), h(Icon, { name: 'arrow_forward' }))
        )
      ),
      h(Grid, { container: true, spacing: 2 },
        h(Grid, { item: true, xs: 12, md: 4 }, Card('Customer Support Triage')),
        h(Grid, { item: true, xs: 12, md: 4 }, Card('Product Review Summarizer')),
        h(Grid, { item: true, xs: 12, md: 4 }, Card('Research Assistant'))
      )
    );
  }

  function Layout() {
    // Removed header and drawer; keep a simple two-pane layout
    return h(ThemeProvider, { theme },
      h(CssBaseline),
      h(Box, { sx: { display: 'grid', gridTemplateColumns: { xs: '1fr', md: '22% 1fr' }, minHeight: '100dvh' } },
        // Sidebar always rendered; sticky only on desktop
        h(Box, { sx: { position: { md: 'sticky' }, top: 0, alignSelf: 'start', height: { md: '100dvh' } } }, h(SidebarContent)),
        // Main content, centered column
        h(Box, { sx: { width: '100%', bgcolor: '#F8F6F2' } },
          h(Stack, { spacing: 4, sx: { width: { xs: '100%', md: 'min(60%, 980px)' }, mx: 'auto', px: 2, py: 4 } },
            h(WelcomeChat),
            h(ActionToolbar),
            h(ContentLibrary)
          )
        )
      )
    );
  }

  ReactDOM.createRoot(document.getElementById('mui-root')).render(h(Layout));
})();
