db.define_table('m_rooms', Field('NAME', length=50), Field('BUILDING', 'integer'), Field('PURPOSE', 'integer'),
          Field('FLR', 'integer'), Field('FAC', length=100), Field('OWNER', 'integer'))
db.define_table('m_buildings', Field('NAME', length=20), Field('ADDRESS', length=250), Field('PURPOSE', length=100),
          Field('EXTRA', length=100))
db.define_table('m_room_purpose', Field('NAME', length=50))
db.define_table('m_buildings_purpose', Field('NAME', length=50))
db.define_table('t_fac', Field('FULL_NAME', length=50))
db.define_table('s_divisions', Field('NAME', length=50))
