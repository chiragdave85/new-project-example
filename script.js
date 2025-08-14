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
    Stack, Button, ButtonGroup, TextField, MenuItem, Select, InputLabel, FormControl, Link, Grid, Chip,
    Tabs, Tab, Container, Card, CardContent, Menu
   } = MUI;

  const themeBase = {
    shape: { borderRadius: 999 },
    typography: { fontFamily: 'BentonSansPro, Benton Sans, -apple-system, system-ui, Segoe UI, Roboto, Arial, sans-serif' },
    palette: { mode: (rootEl.getAttribute('data-theme') === 'dark') ? 'dark' : 'light', primary: { main: '#6366f1' } }
   };
  let theme = createTheme(themeBase);

  const Icon = ({ name, size = 24 }) => h('span', { className: 'material-symbols-outlined', style: { fontSize: size } }, name);

  // New Right Side Content per spec
  function RightContent() {
    const [tab, setTab] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [modelName, setModelName] = useState('ChatGPT');
    const [modelVersion, setModelVersion] = useState('GPT-4o');
    const modelOpen = Boolean(anchorEl);

    const handleModelClick = (e) => setAnchorEl(e.currentTarget);
    const handleModelClose = () => setAnchorEl(null);
    const chooseModel = (name, version) => { setModelName(name); setModelVersion(version); handleModelClose(); };

    return h(Box, { sx: { minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f8f9fa' } },
      h(Container, { maxWidth: 'lg' },
        h(Stack, { spacing: 4, alignItems: 'stretch' },
          // Header
          h(Typography, {
            variant: 'h2', align: 'center', sx: {
              color: '#2d3748', mt: { xs: 4, md: 8 }, fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontFamily: 'Inter, BentonSansPro, -apple-system, system-ui, Segoe UI, Roboto, Arial, sans-serif'
            }
          }, 'Welcome!'),

          // Pixel-perfect frame (40px below header)
          h(Box, { sx: { mt: '40px', display: 'flex', justifyContent: 'center' } },
            h(Box, {
              sx: {
                width: '100%', maxWidth: '1024px', height: '280px',
                p: '24px',
                borderRadius: '16px',
                background: 'linear-gradient(90deg, #7B2FF7 0%, #5A00E0 100%)',
                color: '#FFFFFF',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                fontFamily: 'Inter, BentonSansPro, -apple-system, system-ui, Segoe UI, Roboto, Arial, sans-serif',
                display: 'flex', flexDirection: 'column', gap: '16px'
              }
            },
              // Top navigation row (grouped left)
              h(Stack, { direction: 'row', spacing: 1.5, alignItems: 'center' },
                h(Typography, { sx: { fontSize: '16px', fontWeight: 600, color: '#FFFFFF' } }, 'Chat with'),
                // Buttons
                h(Button, {
                  variant: 'contained',
                  startIcon: h(Icon, { name: 'auto_awesome', size: 20 }),
                  sx: {
                    height: '40px', borderRadius: '20px', px: 2,
                    textTransform: 'none', fontSize: '14px', fontWeight: 600,
                    bgcolor: '#8C4CFF', color: '#FFFFFF',
                    '& .material-symbols-outlined': { fontSize: '20px !important', width: '20px', height: '20px', lineHeight: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mr: '8px' },
                    '&:hover': { bgcolor: '#8243f5' }
                  }
                }, 'AI Model'),
                h(Button, {
                  variant: 'outlined',
                  startIcon: h(Icon, { name: 'menu_book', size: 20 }),
                  sx: {
                    height: '40px', borderRadius: '20px', px: 2,
                    textTransform: 'none', fontSize: '14px', fontWeight: 600,
                    color: '#FFFFFF', borderColor: '#CBB7FF',
                    '& .material-symbols-outlined': { fontSize: '20px !important', width: '20px', height: '20px', lineHeight: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mr: '8px' },
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', borderColor: '#CBB7FF' }
                  }
                }, 'Knowledge Base'),
                h(Button, {
                  variant: 'outlined',
                  startIcon: h(Icon, { name: 'smart_toy', size: 20 }),
                  sx: {
                    height: '40px', borderRadius: '20px', px: 2,
                    textTransform: 'none', fontSize: '14px', fontWeight: 600,
                    color: '#FFFFFF', borderColor: '#CBB7FF',
                    '& .material-symbols-outlined': { fontSize: '20px !important', width: '20px', height: '20px', lineHeight: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mr: '8px' },
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)', borderColor: '#CBB7FF' }
                  }
                }, 'AI Agent')
              ),

              // Middle + Bottom inside white box
              h(Box, {
                sx: {
                  bgcolor: '#FFFFFF', borderRadius: '12px',
                  height: '160px', // 120 input area + ~40 footer row
                  color: '#111827',
                  display: 'flex', flexDirection: 'column',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }
              },
                // Input area
                h(Box, { sx: { flex: 1, p: '16px' } },
                  h(TextField, {
                    fullWidth: true, multiline: true, placeholder: 'Ask a question...',
                    variant: 'outlined',
                    sx: {
                      bgcolor: '#FFFFFF',
                      '& .MuiOutlinedInput-root': { p: 0, alignItems: 'flex-start', bgcolor: 'transparent' },
                      '& textarea.MuiOutlinedInput-input': { p: 0, m: 0, fontSize: '16px', color: '#111827' },
                      '& .MuiOutlinedInput-inputMultiline::placeholder': { color: '#9CA3AF', opacity: 1 },
                      '& fieldset': { border: 'none' },
                      '& .MuiOutlinedInput-root.Mui-focused fieldset': { border: 'none' }
                    }
                  })
                ),
                // Footer row inside white box
                h(Stack, { direction: 'row', alignItems: 'center', justifyContent: 'space-between', sx: { px: '12px', py: 0, height: '40px' } },
                  // Left dropdown trigger (label + gray subtitle)
                  h(Button, {
                    id: 'model-button', 'aria-controls': modelOpen ? 'model-menu' : undefined, 'aria-haspopup': 'true', 'aria-expanded': modelOpen ? 'true' : undefined,
                    onClick: handleModelClick,
                    sx: { textTransform: 'none', p: 0, minWidth: 0, color: '#111827' }
                  },
                    h(Stack, { direction: 'row', spacing: 1, alignItems: 'center' },
                      h(Typography, { sx: { fontSize: '14px', fontWeight: 600, color: '#111827' } }, modelName),
                      h(Typography, { sx: { fontSize: '14px', fontWeight: 400, color: '#9CA3AF' } }, modelVersion)
                    )
                  ),
                  h(Menu, { id: 'model-menu', anchorEl, open: modelOpen, onClose: handleModelClose, MenuListProps: { 'aria-labelledby': 'model-button' } },
                    h(MenuItem, { onClick: () => chooseModel('ChatGPT', 'GPT-4o') }, 'ChatGPT — GPT-4o'),
                    h(MenuItem, { onClick: () => chooseModel('ChatGPT', 'Latest') }, 'ChatGPT — Latest')
                  ),
                  // Right send icon in light gray circle
                  h(IconButton, {
                    'aria-label': 'Send message',
                    sx: { width: 40, height: 40, borderRadius: '50%', bgcolor: '#F3F4F6', color: '#111827', '&:hover': { bgcolor: '#E5E7EB' } }
                  }, h(Icon, { name: 'send', size: 16 }))
                )
              )
            )
          ),

          // Keep existing action buttons and prompt library below
          h(Stack, { direction: 'row', spacing: 1.5, justifyContent: 'center', flexWrap: 'wrap' },
             ['Write', 'Analyze', 'Code', 'Ideate', 'Create'].map((label, i) =>
               h(Chip, {
                 key: label,
                 label,
                 icon: h(Icon, { name: ['edit', 'analytics', 'code', 'lightbulb', 'add'][i] }),
                 variant: 'outlined',
                component: 'a',
                href: '',
                 sx: {
                   height: '40px',
                   borderRadius: '20px',
                  pl: 2,
                   bgcolor: '#FFFFFF',
                   borderColor: 'rgba(0,0,0,0.12)',
                   color: '#1f2937',
                   '& .material-symbols-outlined': { color: '#1f2937' },
                   '& .MuiChip-label': { px: 2 },
                   transition: 'background-color .2s ease',
                  '&:hover': { bgcolor: '#F8FAFC' }
                 }
               })
             )
           ),

          // Prompt Library (unchanged)
          h(Stack, { spacing: 2 },
            h(Grid, { container: true, alignItems: 'center' },
              h(Grid, { item: true, xs: 12, md: 6 },
                h(Typography, { variant: 'h5', sx: { fontWeight: 700 } }, 'Start from Prompt Library')
              ),
              h(Grid, { item: true, xs: 12, md: 6 },
                h(Stack, { direction: 'row', justifyContent: { xs: 'flex-start', md: 'flex-end' } },
                  h(Link, { href: '#', underline: 'hover' },
                    h(Stack, { direction: 'row', spacing: 0.5, alignItems: 'center' }, h('span', null, 'View All'), h(Icon, { name: 'arrow_forward' }))
                  )
                )
              )
            ),
            h(Grid, { container: true, spacing: 2 },
              h(Grid, { item: true, xs: 12, md: 4 },
                h(Card, { variant: 'outlined', sx: { bgcolor: '#fbfbfb', borderRadius: '16px' } },
                  h(CardContent, null,
                    h(Chip, { label: 'Writing', size: 'small', variant: 'filled', icon: h(Icon, { name: 'edit', size: 16 }), sx: { bgcolor: '#F3F4F6', color: 'text.primary', borderRadius: '999px' } }),
                    h(Typography, { variant: 'subtitle1', sx: { mt: 1, fontWeight: 700 } }, 'Creative Writing Assistant'),
                    h(Typography, { variant: 'body2', sx: { mt: 0.5, color: 'text.secondary' } },
                      'Generate compelling stories, articles, and creative content with advanced AI assistance.'
                    )
                  )
                )
              ),
              h(Grid, { item: true, xs: 12, md: 4 },
                h(Card, { variant: 'outlined', sx: { bgcolor: '#fbfbfb', borderRadius: '16px' } },
                  h(CardContent, null,
                    h(Chip, { label: 'Analysis', size: 'small', variant: 'filled', icon: h(Icon, { name: 'bar_chart', size: 16 }), sx: { bgcolor: '#F3F4F6', color: 'text.primary', borderRadius: '999px' } }),
                    h(Typography, { variant: 'subtitle1', sx: { mt: 1, fontWeight: 700 } }, 'Data Analysis Expert'),
                    h(Typography, { variant: 'body2', sx: { mt: 0.5, color: 'text.secondary' } },
                      'Analyze complex datasets, generate insights, and create visualizations from your data.'
                    )
                  )
                )
              ),
              h(Grid, { item: true, xs: 12, md: 4 },
                h(Card, { variant: 'outlined', sx: { bgcolor: '#fbfbfb', borderRadius: '16px' } },
                  h(CardContent, null,
                    h(Chip, { label: 'Development', size: 'small', variant: 'filled', icon: h(Icon, { name: 'code', size: 16 }), sx: { bgcolor: '#F3F4F6', color: 'text.primary', borderRadius: '999px' } }),
                    h(Typography, { variant: 'subtitle1', sx: { mt: 1, fontWeight: 700 } }, 'Code Review & Debug'),
                    h(Typography, { variant: 'body2', sx: { mt: 0.5, color: 'text.secondary' } },
                      'Get help with code optimization, debugging, and best practices across multiple languages.'
                    )
                  )
                )
              )
            )
          )
        )
      )
    );
  }

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
        h(Box, { sx: { width: '100%', bgcolor: '#f8f9fa' } }, h(RightContent))
       )
     );
   }

  ReactDOM.createRoot(document.getElementById('mui-root')).render(h(Layout));
})();
