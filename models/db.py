# -*- coding: utf-8 -*-

#request.requires_https()

db = DAL('firebird://webstud:ynv54ubv438@192.168.20.105/student2', ignore_field_case=True, entity_quoting=False, pool_size=1, migrate_enabled=False)

from gluon.tools import Crud
db_app = DAL("sqlite://storage.sqlite")
db_app.define_table('post', Field('email', 'text', requires = [IS_NOT_EMPTY(), IS_EMAIL()]),
                    Field('country', 'text', requires = IS_NOT_EMPTY()), Field('code', 'text'))
session.connect(request, response, db_app, masterapp=None)
crud = Crud(globals(), db_app)

## by default give a view/generic.extension to all actions from localhost
## none otherwise. a pattern can be 'controller/function.extension'
response.generic_patterns = ['*'] if request.is_local else []

response.formstyle = 'bootstrap3_inline'
response.form_label_separator = ''

from gluon.tools import Auth, Service, PluginManager, base64

service = Service()
plugins = PluginManager()

# configure email
from gluon.tools import Mail

mail = Mail()
mail.settings.server = 'smtp.timacad.ru:25'
mail.settings.sender = 'priem_kf@timacad.ru'
mail.settings.login = 'priem_kf@timacad.ru:vbn354&frt9'

timacad_mail = Mail()
timacad_mail.settings.server = 'smtp.yandex.ru:25'
timacad_mail.settings.sender = 'pk_anketa1@tim-stud.ru'
timacad_mail.settings.login = 'pk_anketa1@tim-stud.ru:123zaq123'
# timacad_mail.settings.server = 'smtp.timacad.ru:25'
# timacad_mail.settings.sender = 'anketa@timacad.ru'
# timacad_mail.settings.login = 'anketa@timacad.ru:0202822018'

from gluon.storage import Storage
settings = Storage()

settings.migrate = True
settings.title = 'Электронная форма подачи заявления'
settings.subtitle = 'powered by web2py'
settings.author = 'oas'
settings.author_email = 'casus@rgau-msha.ru'
settings.keywords = ''
settings.description = 'Электронная форма подачи заявления'
settings.layout_theme = 'Default'
settings.database_uri = ''
settings.security_key = 'f23597b6-33fc-42c9-b3c7-15dbe264ace4'
settings.email_server = 'smtp.yandex.ru:25'
settings.email_sender = 'oas@rgau-msha.ru'
settings.email_login = 'oas@rgau-msha.ru:456rty'
settings.login_method = 'local'
settings.login_config = ''
settings.plugins = []
T.force('ru')

from gluon import current
current.db = db
current.db_app = db_app
current.T = T
current.session = session
