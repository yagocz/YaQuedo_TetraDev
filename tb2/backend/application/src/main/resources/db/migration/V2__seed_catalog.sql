-- Seed inicial de categorías de servicio y distritos de Lima Metropolitana

INSERT INTO service_categories (id, name, slug, icon_key, active) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Electricidad',         'electricidad',         'bolt',         TRUE),
  ('11111111-1111-1111-1111-111111111102', 'Gasfitería',           'gasfiteria',           'wrench',       TRUE),
  ('11111111-1111-1111-1111-111111111103', 'Pintura',              'pintura',              'paint-roller', TRUE),
  ('11111111-1111-1111-1111-111111111104', 'Cerrajería',           'cerrajeria',           'key',          TRUE),
  ('11111111-1111-1111-1111-111111111105', 'Electrodomésticos',    'electrodomesticos',    'blender',      TRUE),
  ('11111111-1111-1111-1111-111111111106', 'Limpieza técnica',     'limpieza-tecnica',     'broom',        TRUE);

INSERT INTO districts (id, name, region, ubigeo) VALUES
  ('22222222-2222-2222-2222-222222222201', 'San Miguel',     'Lima Metropolitana', '150136'),
  ('22222222-2222-2222-2222-222222222202', 'Magdalena',      'Lima Metropolitana', '150120'),
  ('22222222-2222-2222-2222-222222222203', 'Pueblo Libre',   'Lima Metropolitana', '150121'),
  ('22222222-2222-2222-2222-222222222204', 'Jesús María',    'Lima Metropolitana', '150113'),
  ('22222222-2222-2222-2222-222222222205', 'Lince',          'Lima Metropolitana', '150116'),
  ('22222222-2222-2222-2222-222222222206', 'Miraflores',     'Lima Metropolitana', '150122'),
  ('22222222-2222-2222-2222-222222222207', 'San Isidro',     'Lima Metropolitana', '150131'),
  ('22222222-2222-2222-2222-222222222208', 'Surquillo',      'Lima Metropolitana', '150140'),
  ('22222222-2222-2222-2222-222222222209', 'Barranco',       'Lima Metropolitana', '150104'),
  ('22222222-2222-2222-2222-222222222210', 'Chorrillos',     'Lima Metropolitana', '150108'),
  ('22222222-2222-2222-2222-222222222211', 'San Borja',      'Lima Metropolitana', '150130'),
  ('22222222-2222-2222-2222-222222222212', 'Surco',          'Lima Metropolitana', '150141'),
  ('22222222-2222-2222-2222-222222222213', 'La Molina',      'Lima Metropolitana', '150114'),
  ('22222222-2222-2222-2222-222222222214', 'Ate',            'Lima Metropolitana', '150103'),
  ('22222222-2222-2222-2222-222222222215', 'San Luis',       'Lima Metropolitana', '150135');
